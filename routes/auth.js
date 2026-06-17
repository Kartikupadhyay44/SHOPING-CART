const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// GET Signup Form
router.get('/register', (req, res) => {
    res.render('auth/signup.ejs');
});

// POST Handle Signup logic
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, role });
        const registeredUser = await User.register(user, password);
        
        // Log in the user automatically after successful registration
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Account created successfully! Welcome to ShopEsite.');
            res.redirect('/items');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});

// GET Login Form
router.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});

// POST Handle Login logic
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    res.redirect('/items');
});

// GET Handle Logout logic
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully. See you again!');
        res.redirect('/items');
    });
});

module.exports = router;

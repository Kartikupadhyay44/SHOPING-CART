const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/items');
const { isLoggedin } = require('../middlewares');

// GET Cart Page
router.get('/user/cart', isLoggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart');
        res.render('cart/index', { cart: user.cart });
    } catch (e) {
        res.status(500).render('partials/error', { error: e.message });
    }
});

// POST Add Item to Cart (increases quantity)
router.post('/user/cart/add/:itemId', isLoggedin, async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        if (!item) {
            req.flash('error', 'Item not found');
            return res.redirect('/items');
        }
        
        const user = await User.findById(req.user._id);
        user.cart.push(item);
        await user.save();
        
        req.flash('success', `${item.name} added to cart!`);
        res.redirect('/user/cart');
    } catch (e) {
        res.status(500).render('partials/error', { error: e.message });
    }
});

// POST Remove one instance of Item from Cart (decreases quantity)
router.post('/user/cart/remove/:itemId', isLoggedin, async (req, res) => {
    try {
        const { itemId } = req.params;
        const user = await User.findById(req.user._id);
        
        const index = user.cart.indexOf(itemId);
        if (index > -1) {
            user.cart.splice(index, 1);
            await user.save();
            req.flash('success', 'Cart updated successfully');
        } else {
            req.flash('error', 'Item not found in cart');
        }
        res.redirect('/user/cart');
    } catch (e) {
        res.status(500).render('partials/error', { error: e.message });
    }
});

// DELETE Remove Item completely from Cart
router.delete('/user/cart/delete/:itemId', isLoggedin, async (req, res) => {
    try {
        const { itemId } = req.params;
        await User.findByIdAndUpdate(req.user._id, { $pull: { cart: itemId } });
        req.flash('success', 'Item removed from cart');
        res.redirect('/user/cart');
    } catch (e) {
        res.status(500).render('partials/error', { error: e.message });
    }
});

module.exports = router;

const express = require('express');
const app = express();
const EjsMateEngine = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Models & Routes
const User = require('./models/user.js');
const ProductRoutes = require('./routes/productRoutes.js');
const ReviewRoutes = require('./routes/reviewRoutes.js');
const AuthRoutes = require('./routes/auth.js');
const CartRoutes = require('./routes/cart.js');
const seed = require('./seed.js');

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/ShoppingCart')
.then(() => {
    console.log('Database connected successfully');
})
.catch((err) => {
    console.error('Database connection error:', err);
});

// Configure EJS and EjsMate layout engine
app.engine('ejs', EjsMateEngine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Core Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session and Cookie Configurations
app.use(cookieParser("thisisnotagoodscreatekey"));
app.use(session({
    secret: 'thisismybekarwalkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Local Strategy on User Model
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Middleware
app.use(flash());

// Pass variables globally to all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Mount Routes
app.use(ProductRoutes);
app.use(ReviewRoutes);
app.use(AuthRoutes);
app.use(CartRoutes);

// Home route redirecting to catalog
app.get('/', (req, res) => {
    res.redirect('/items');
});

// Global Fallback Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    res.status(statusCode).render('partials/error', { error: message });
});

app.listen(3000,'0.0.0.0', () => {
    console.log('Server running on port 3000');
});

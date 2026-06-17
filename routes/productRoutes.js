const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const { isLoggedin, isSeller, isCreator } = require('../middlewares');

router.get('/items', async (req, res) => {
    const products = await Item.find({});
    res.render('products/item.ejs', { products });
});

router.get('/items/show/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Populate both reviews (including their author) and product author
        const item = await Item.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('author');
        res.render('products/show.ejs', { product: item });
    } catch (e) {
        res.status(404).render('partials/error.ejs', { error: e.message });
    }
});

// GET form for new product (protected: must be logged in and a seller)
router.get('/items/new', isLoggedin, isSeller, (req, res) => {
    res.render('products/new.ejs');
});

// Create product POST route (protected: must be logged in and a seller)
router.post('/products/create', isLoggedin, isSeller, async (req, res) => {
    try {
        const { name, price, img, desc } = req.body;
        // Assign the currently logged-in user as the author of the new product
        await Item.create({ name, price, img, desc, author: req.user._id });
        res.redirect('/items');
    } catch (e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});

// Edit product GET route (protected: must be logged in and creator of the product)
router.get('/products/:id/edit', isLoggedin, isCreator, async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        res.render("products/edit.ejs", { product: item });
    } catch (e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});

// Edit product POST route (protected: must be logged in and creator of the product)
router.post('/products/:id/edit', isLoggedin, isCreator, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, img, desc } = req.body;
        await Item.findByIdAndUpdate(id, { name, price, img, desc });
        res.redirect(`/items/show/${id}`);
    } catch (e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});

// Delete product DELETE route (protected: must be logged in and creator of the product)
router.delete('/products/:id/delete', isLoggedin, isCreator, async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.redirect('/items');
    } catch (e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});

// Redirect for /products requests
router.get('/products', (req, res) => {
    res.redirect('/items');
});

module.exports = router;

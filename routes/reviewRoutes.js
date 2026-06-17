//import Express Router, Product model, and Review model.

const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const Review = require('../models/review');
const { isLoggedin } = require('../middlewares');

router.post('/products/:id/reviews', isLoggedin, async (req, res) => {
    try {
        const {id}=req.params;
        const {rating,comment}=req.body;
        const item = await Item.findById(id);
        
        // Create the review and associate it with the item and author
        const review = await Review.create({ rating, comment, author: req.user._id });
        
        item.reviews.push(review);
        await item.save();

        res.redirect(`/items/show/${id}`);
    } catch(e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});


router.delete('/products/:pid/reviews/delete/:rid', isLoggedin, async (req, res) => {
    try {
        const {pid,rid}=req.params; // Extract from params
        const review = await Review.findById(rid);
        
        if (!review) {
            req.flash('error', 'Review not found');
            return res.redirect(`/items/show/${pid}`);
        }
        
        // Ensure only the author of the review can delete it
        if (review.author && !review.author.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to delete this review');
            return res.redirect(`/items/show/${pid}`);
        }
        
        await Item.findByIdAndUpdate(pid, { $pull: { reviews: rid } });
        await Review.findByIdAndDelete(rid);
        res.redirect(`/items/show/${pid}`);
    } catch(e) {
        res.status(500).render("partials/error", { error: e.message });
    }
});

module.exports=router;
const Product = require('./models/items.js');

async function isLoggedin(req, res, next) {
    if (req.user) {
        next();
    } else {
        req.flash('error', 'You need to login first');
        res.redirect('/login');
    }
}

async function isSeller(req, res, next) {
    if (req.user && req.user.role === "Seller") {
        next();
    } else {
        req.flash('error', `You don't have the permission`);
        return res.redirect('/items'); 
    }
}

async function isCreator(req, res, next) {
    try {
        const product_id = req.params.id;
        const product = await Product.findById(product_id);
        
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/items');
        }

        console.log(product.author ? product.author._id : null, "this is the id");
        if (product.author && req.user._id.equals(product.author._id)) {
            next();
        } else {
            req.flash('error', `You don't have the permission`);
            return res.redirect('/items'); 
        }
    } catch (e) {
        req.flash('error', 'Something went wrong while verifying authorization');
        return res.redirect('/items');
    }
}

module.exports = { isLoggedin, isSeller, isCreator };

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: 'Buyer',
        enum: ['Buyer', 'Seller']
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

// plugin passport-local-mongoose to add username, hash, and salt fields automatically
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

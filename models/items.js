const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
   
    },
    img:{
        type:String,
        required:true,
        trim:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;

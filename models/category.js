const mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
    cat_title:{
        type:String,
        maxLength:20,
        minLength:4,
        
    },
    ar_title:{
        type:String,
        maxLength:20,
        minLength:4,
        
    },
    sub_categories:{
        type:Array,
        
        
    },

},{timestamps: true});



let categoryModel = mongoose.model('categories',categorySchema);

module.exports = categoryModel ; 
const mongoose = require('mongoose');
let orderSchema = mongoose.Schema({
    
   customer_Id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
    },
    cart_Customer:{
        type:Array
    },
    status:{
        type :String,
        default:'pending'
    },
},{timestamps: true,
})

let orderModel = mongoose.model('order',orderSchema);
module.exports = {orderModel};

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);
let customerRoute = require ('./routes/Customers.js')
let retailerRoute = require('./routes/Retailers.js')
let adminRoute = require('./routes/Admins.js')
let productRoute = require('./routes/product.js')
let cartRoute = require('./routes/cart.js')
let orderRoute = require('./routes/orders.js')
let paymentRoute = require('./routes/payment.js')
let categoryRoute = require('./routes/category.js')
let wishListRoute = require('./routes/wishList.js')
// ? ==> Creating app <==
const app = express();

// !======> the order of middlewares is important <=======
// ? ==> middleware <==
app.use(express.json()) // any req will transform into js fromat
// ?===> cors middleware error handling <==
app.use(cors({
    origin:'*'
}))
// !-----------------------------------------------------------------------
app.use('/customer',customerRoute);
app.use('/retailer',retailerRoute);
app.use('/admin',adminRoute);
app.use('/product',productRoute);
app.use('/category',categoryRoute);
app.use('/customer/cart',cartRoute);
app.use('/customer/wishList',wishListRoute);
app.use('/customer/order',orderRoute);
app.use('/payment',paymentRoute);


// !--------------------------- error handling middleWares-----------------------------------
// ? Not Found MiddleWare
app.use('*',function(req,res,next){
    res.status(404).json({messge:"Not Found"});
});
// ? error handling middleware
app.use(function(err,req,res,next){
    res.status(500).json({messge:"something Went Wrong..!",error:err});
});
// !-------------------------------------------------------------
// ?====> Connect to MongoDB <=======
mongoose.connect('mongodb+srv://hossammelsheikh:BLzLjKDDSE7AdnDw@data.ewilhir.mongodb.net/walmart?retryWrites=true&w=majority').then(()=>{
    console.log('Conected to Mongo DB Successefully');
}).catch((err)=>{
    console.log(err);
})
// ?=====> Connect to server Port <=====
app.listen(3333, ()=>{
    console.log('listening on port 3333');
})
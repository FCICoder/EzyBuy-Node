require('dotenv').config();
const customerModel = require('../models/Customers');
const paymentModel = require('../models/Payment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// !============> Simple Payment Form <==============
let paymentForm= async (req,res)=>{
    const {amount} = req.body;
    const {value} = req.body
    const {cart} = req.body;
    let id = req.id
    let role = req.role
    if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
          });
        res.status(200).send(paymentIntent.client_secret)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// ? get Customer Model Payment
let getPayment = async (req,res)=>{
    id = req.id;
    role = req.role;
    if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});
    try{
        let payment = await paymentModel.findOne({customer_Id:id})
        // console.log(payment);
        res.status(201).json({message:'payment successfully retrieved' , payment:payment})
    }catch(err){
        res.status(501).json({message:err.message})
    }
} 

module.exports = {paymentForm,getPayment}
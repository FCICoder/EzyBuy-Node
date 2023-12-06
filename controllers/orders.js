const customerModel = require("../models/Customers");
let { orderModel } = require("../models/orders");
let RetailerModel = require('../models/Retailer');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


let createOrder = async (req, res) => {
  const { amount, value, cart } = req.body;
  let id = req.id;
  let role = req.role;
  if (role !== "user")
    return res.status(401).json({ message: "You Are Not A User" });
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    await orderModel.create({cart_Customer:cart,customer_Id:id});
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getOrderByIdCustomer = async (req, res) => {
  let customerId = req.id;
  try {
    let orders = await orderModel.find({ customer_Id: customerId });
    res
      .status(200)
      .json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for seller 
let getOrderByRetailerID = async (req, res)=>{
  let retailerID = req.id;
  try {
    let allOrders = await orderModel.find();
    let orders=[]
    

    await Promise.all(allOrders.map(async (order) => {
      for (const item of order.cart_Customer) {
        if (item.retailer_id === retailerID) {
          const customer = await customerModel.findOne({ _id: order.customer_Id });
          if (customer) {
            orders.push({
              ...item,
              customerID: order.customer_Id,
              orderID: order._id,
              customerName: customer.name,
              customerEmail: customer.email
            });
          }
        }
      }
    }));
  
    res
      .status(200)
      .json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}
let updateOrder = async (req, res) => {
  order_id = req.params.id;
  product_id = req.body.productID;
  let upStatus = req.body.status;
  try {
    let order = await orderModel.findOne(
      { _id: order_id }
    );
    let newCart = [...order.cart_Customer]
    newCart.forEach((item)=>{
      if(item.id == product_id){
        item.status = upStatus
      }
    }
    )
    await orderModel.updateOne({_id: order_id}, {$set : {cart_Customer: newCart}})
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Status updated for order", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

let deleteOrder = async (req, res) => {
  order_id = req.params.id;
  try {
    let order = await orderModel.findOne({ _id: order_id });
    if (order) {
      if (order.status !== "shipping") {
        await orderModel.deleteOne({ _id: order_id });
        res.status(200).json({ message: "Delete order successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Order is already shipped and cannot be deleted" });
      }
    } else {
      res.status(404).json({ message: "Order not found for the customer" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getAllOrders =async (req, res) => {
  let prds = [];
  try {
    let orders = await orderModel.find();
    if (orders) {
      await Promise.all (await  orders.map(async order => {
        
        ret = await Promise.all (order.cart_Customer.map(async prd=>{

          await RetailerModel.findOne({_id:prd.retailer_id}).then(res=>{
            prd.name = res.name;
            prd.email = res.email;
            // console.log(prd);
         })
         prds.push(prd)

        }))
      
      }))
        res.status(200).json({ message: " Orders retrieved successfully" , Orders:prds   });
    } else {
      res.status(404).json({ message: "there is no order yet ..!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createOrder,
  getOrderByIdCustomer,
  deleteOrder,
  updateOrder,
  getOrderByRetailerID,
  getAllOrders
};

let customerModel = require("../models/Customers");


// ? get the customer Cart 
let getCart = async (req, res) => {
  let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "You Are Not A User" });
  }

  try {
    let customer = await customerModel.findOne({ _id: id });
    if(!customer){
      return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
    }
    res
      .status(200)
      .json({ message: "cart successfully retrieved", cart: customer.cart });
  } catch (err) {
    res.status(500).json({ message: "something went wrong, try again" });
  }
};
let replaceCart = async(req, res) => {
  let newCart = req.body.newCart;
  let id = req.id;
let role = req.role;
if (role !== "user") {
  return res.status(401).json({ message: "You Are Not A User" });
}
  try{
    let customer = await customerModel.findOne({ _id: id });
    if(!customer){
      return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
    }
    await customerModel.updateOne({_id:id} , {$set : {cart: newCart}});
    res.status(200).json({message: 'Cart updated successfully'})
  }catch(e){
    res.status(500).json({message:"Cart not found"})
  }
}
let addOldCart = async (req, res) => {
    let LocalCart = req.body.localCart;
    let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "You Are Not A User" });
  }
    try{
      let customer = await customerModel.findOne({ _id: id });
      if(!customer){
        return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
      }
      let newCart = [...customer.cart, ...LocalCart]
      await customerModel.updateOne({_id:id} , {$set : {cart: newCart}});
      res.status(200).json({message: 'Cart updated successfully'})
    }catch(e){
      res.status(500).json({message:"Cart not found"})
    }
}
// ? delete an item from the cart 
let deleteProduct = async (req, res) => {
  let id = req.id;
  let role = req.role;
  let product_id = req.params.id;
  if (role !== "user") {
    return res.status(401).json({ message: "login as a user" });
  }
  try {
    let customer = await customerModel.findOne({ _id: id });
    if(!customer){
      return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
    }
    let newCart = customer.cart.filter((p) => p._id != product_id);
    let updatedCustomer = await customerModel.updateOne(
      { _id: id },
      { $set: { cart: newCart } }
    );
    res
      .status(200)
      .json({ message: "product successfully deleted", cart: updatedCustomer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//? delete cart items 
let emptyCart = async (req, res) => {
  let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "You Are Not A User" });
  }
  let customer = await customerModel.findOne({ _id: id });
  if(!customer){
      return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
    }
  try {
    await customerModel.updateOne({ _id: id }, { $set: { cart: [] } });
    res.status(200).json({ message: "cart is empty now" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ? updating the Quantity of an item
let editQuantity = async (req,res) => {
    let id = req.id;
    
    let role =req.role;
    let product_id = req.params.id
    let newQuantity = req.params.quantity
   
    if(role !== 'user') return res.status(401).json({message: 'You Are Not A User'});
        
    try {
        let customer = await customerModel.findOne({_id:id});
        if(!customer){
          return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
        }
        let newCart  = customer.cart.filter((pro)=> {
        
           if(pro._id == product_id){ 
            return pro.quantity = newQuantity;
           }
          
        });
        let updatedCustomer = await customerModel.updateOne({_id:id} , {$set : {cart:newCart}});

        res.status(200).json({message:"Quantity Updated Successfully",  cartUpdat:customer.cart});    
    }catch(err){
        res.status(500).json({message: err.message});
    }

}

// ? total Price of tha cart Products
let totalPrice = async (req,res)=>{
  id = req.id;
  role = req.role;
  let totalPrice = 0 ;
  if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});

  try{
    let customer = await customerModel.findOne({_id:id});
    if(!customer){
      return res.status(401).json({message: 'this Customer is not found  please Sign Up First'}); 
    }
    let newCart = customer.cart.map((pro)=>{
      let prodPrice = pro.price * pro.quantity;
      totalPrice += prodPrice;
      return totalPrice;
    })

    res.status(200).json({message:"total Prcie is",  totalPrice : totalPrice});  
  
  }catch(err){
    res.status(500).json({message : err.message});
  }
}

module.exports = { getCart, deleteProduct, emptyCart ,editQuantity , totalPrice,addOldCart,replaceCart};

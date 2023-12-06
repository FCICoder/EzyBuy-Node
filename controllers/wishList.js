let customerModel = require("../models/Customers");
let productModel = require("../models/Product");

// ? add to WishList
let addtoWishList = async (req, res) => {
  let product_id = req.params.id;
  let customer_id = req.id;
  let role = req.role;
  if (role != "user") {
    return res
      .status(401)
      .json({ message: "please login first to add to wishList" });
  }

  let product = await productModel.findOne({ _id: product_id });
  let customerWishList = await customerModel.findOne(
    { _id: customer_id },
    { wishList: 1, _id: 0 }
  );
  let isAdded = await customerWishList.wishList.find(
    (p) => p._id == product_id
  );
  if (isAdded) {
    return res
      .status(200)
      .json({ message: "you already have this product in your wishList" });
  } else {
    try {
      await customerModel.updateOne(
        { _id: customer_id },
        { $push: { wishList: product } }
      );
      res.status(200).json({ message: "successfully added to wishList" });
    } catch (err) {
      //? if it's a retailer won't be able to add it to the cart
      err.message = "please login first";
      res.status(401).json({ message: "please login first" });
    }
  }
};



// ? get the customer wishList
let getWishList = async (req, res) => {
  let id = req.id;
  let role = req.role;
  let name = req.name;
  if (role !== "user") {
    return res.status(401).json({ message: "You Are Not A User" });
  }

  try {
    let customer = await customerModel.findOne({ _id: id });
    if (!customer) {
      return res
        .status(401)
        .json({ message: "this Customer is not found  please Sign Up First" });
    }
    res
      .status(200)
      .json({
        message: "WishList successfully retrieved",
        wishList: customer.wishList,
        name:name,
      });
  } catch (err) {
    res.status(500).json({ message: "something went wrong, try again" });
  }
};

// ? delete an item from the wishList
let deleteProduct = async (req, res) => {
  let id = req.id;
  let role = req.role;
  let product_id = req.params.id;
  if (role !== "user") {
    return res.status(401).json({ message: "login as a user" });
  }
  try {
    let customer = await customerModel.findOne({ _id: id });
    if (!customer) {
      return res
        .status(401)
        .json({ message: "this Customer is not found  please Sign Up First" });
    }
    let newWishList = customer.wishList.filter((p) => p._id != product_id);
    let updatedCustomer = await customerModel.updateOne(
      { _id: id },
      { $set: { wishList: newWishList } }
    );
    res
      .status(200)
      .json({
        message: "product successfully deleted",
        wishList: updatedCustomer,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ? delete wishList items
let emptyWishList = async (req, res) => {
  let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "You Are Not A User" });
  }
  let customer = await customerModel.findOne({ _id: id });
  if (!customer) {
    return res
      .status(401)
      .json({ message: "this Customer is not found  please Sign Up First" });
  }
  try {
    await customerModel.updateOne({ _id: id }, { $set: { wishList: [] } });
    res.status(200).json({ message: "wishList is empty now" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getWishList,
  deleteProduct,
  emptyWishList,
  addtoWishList,
};

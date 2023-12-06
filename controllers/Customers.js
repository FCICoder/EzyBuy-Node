let customerModel = require("../models/Customers");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcrypt");

// ? get single customer data
let getCustomerData = async (req, res) => {
  let customerID = req.id;
  try {
    let customer = await customerModel.findOne({ _id: customerID });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json("Something Went Wrong..! );");
  }
};
// ? get all customers
let getAllCustomers =async (req,res)=>{
try{
    let customers = await customerModel.find();
    res.status(200).json({message:'customers retrieved successfully',customers});
}catch(err){
    res.status(500).json({message:'Something Went Wrong..! '});
}
}

// ? signup first time
let signUp = async (req, res) => {
  let customer = req.body;
  try {
    let newCustomer = await customerModel.create(customer);

    res
      .status(201)
      .json({ message: "customer saved successfully", data: newCustomer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ? check
let check = async (req, res) => {
  let { email } = req.body;
  try {
    let customer = await customerModel.findOne({ email: email });
    if (!customer) {
      res.status(201).json({ message: "customer Not found", data: false });
    } else {
      res.status(201).json({ message: "customer found", data: true });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ? log in customer
let login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
  } else {
    try {
      let customer = await customerModel.findOne({ email: email });
      // console.log(customer);
      if (customer) {
        let isValid = await bcrypt.compare(password, customer.password);
        if (isValid) {
          //* generate token
          // console.log(customer.role);
          const token = jwt.sign(
            {
              id: customer._id,
              email: customer.email,
              name: customer.name,
              role: customer.role,
            },
            process.env.SECRET
          );
          res
            .status(200)
            .json({ message: "login successfull", data: customer, token });
        } else {
          res.status(400).json({ message: "password or email is wrong" });
        }
      } else {
        res.status(400).json({ message: "this email is not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

//? logout from
let logout = async (req, res) => {
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({ message: "token is invalid" });
      } else {
        // console.log(delete axios.defaults.headers.common['Authorization']);
        //    axios.defaults.headers.delete["Authorization"];

        res.status(200).json({ message: "logout successfull" });
      }
    });
  } else {
    res.status(400).json({ message: "You Are Not Loged IN" });
  }
};

//? delete
let delet = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  try {
    let customer = await customerModel.findOne({ _id: id });
    // console.log(customer);
    if (customer) {
      await customerModel.deleteOne({ _id: customer._id });
      res
        .status(200)
        .json({ message: "customer deleted succeesfully", data: customer });
    } else {
      res.status(404).json({ message: "customer is not?? found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//? update
let update = async (req, res) => {
  let id = req.id;
  let data = req.body.data;

  try {
    let newData = await customerModel.replaceOne({_id: id}, data);
    // console.log(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
    // console.log(err.message);
  }
};

////////////////////cart
let addcart = async (req, res) => {
  let cart = req.body;
  try {
    let newcart = await customerModel.create(cart);

    res.status(201).json({ message: "cart saved successfully", data: newcart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllCustomers,
  signUp,
  login,
  logout,
  delet,
  update,
  addcart,
  check,
  getCustomerData,
};

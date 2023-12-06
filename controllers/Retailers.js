let RetailerModel = require('../models/Retailer');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

let getRetailerInfo = async (req, res) => {
    let retailerID = req.id;
    try{
        let retailerInfo = await RetailerModel.findOne({_id:retailerID})
        res.status(200).json(retailerInfo)
    }catch(e){
        res.status(404).json({message:"Error fetching data"})
    }
}
// ? SignUp for Retailer
let addNewRetailer = async (req,res)=>{
    let retailer = req.body
    try{
        let newRetailer = await RetailerModel.create(retailer)
        res.status(200).json({message:"retailer created successfully", data:newRetailer})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

// ? Get Retailers
let getAllRetailers = async (req, res) => {
    try{
        let retailers = await RetailerModel.find();
        res.status(200).json(retailers)
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

// ? loging Retailer
let loginRetailer = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:'you must provide email and password'})
    }
    const retailer = await RetailerModel.findOne({email: email})
    if(!retailer){
       return res.status(404).json({message:"wrong email or password"})
    }
    const isValid = await bcrypt.compare(password,retailer.password)
    if (!isValid){
       return res.status(401).json({message:"wrong email or password"})
    }

    const token = jwt.sign({email:retailer.email,role:retailer.role,id:retailer._id,name:retailer.name,phone:retailer.phone  },process.env.SECRET)
    res.status(200).json({message:"logged in successfully",token:token})
}

// ? update Retailer
let editRetailerData = async (req,res)=>{
    let retailerID = req.id
    let newInfo= req.body.data
    try{
        let retailer = await RetailerModel.replaceOne({_id:retailerID},newInfo);
        res.status(200).json({message:"edited successfully",body:retailer})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// ? check 
let check = async(req,res)=>{
    let {email} = req.body
        try{
            let retailer = await RetailerModel.findOne({email: email})
            if(!retailer){
                res.status(201).json({message:"retailer Not found",data:false});
            }else{
                res.status(201).json({message:"retailer found",data:true});
            }
            
        }catch(err){
            res.status(400).json({message:err.message});
        }
}
let delet = async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    try {
      let Retailer = await RetailerModel.findOne({ _id: id });
      // console.log(Retailer);
      if (Retailer) {
        await RetailerModel.deleteOne({ _id: Retailer._id });
        res
          .status(200)
          .json({ message: "Retailer deleted succeesfully", data: Retailer });
      } else {
        res.status(404).json({ message: "Retailer is not?? found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
module.exports = {getRetailerInfo,addNewRetailer,getAllRetailers,loginRetailer,editRetailerData , check ,delet}
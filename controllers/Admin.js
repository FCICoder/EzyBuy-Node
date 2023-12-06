let AdminModel = require('../models/Admin');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ? SignUp for admin
let addNewAdmin = async (req,res)=>{
    let Admin = req.body
    try{
        let newAdmin = await AdminModel.create(Admin)
        res.status(200).json({message:"Admin created successfully", data:newAdmin})
    }catch(err){
        res.status(401).json({message:err.message ,m:"kd"})
    }
}

// ? Get Admins
let getAllAdmins = async (req, res) => {
    try{
        let Admins = await AdminModel.find();
        res.status(200).json(Admins)
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

// ? loging Admin
let loginAdmin = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:'you must provide email and password'})
    }
    const Admin = await AdminModel.findOne({email: email})
    if(!Admin){
       return res.status(404).json({message:"wrong email or password"})
    }
    const isValid = await bcrypt.compare(password,Admin.password)
    if (!isValid){
       return res.status(401).json({message:"wrong email or password"})
    }

    const token = jwt.sign({email:Admin.email,role:Admin.role,id:Admin._id,name:Admin.name,phone:Admin.phone  },process.env.SECRET)
    res.status(200).json({message:"logged in successfully",token:token})
}

// ? update Admin
let editAdminData = async (req,res)=>{
    let AdminID = req.id
    let {name,email,phone}= req.body
    try{
        let Admin = await AdminModel.updateOne({_id:AdminID},{email:email,name:name ,phone});
        res.status(200).json({message:"edited successfully",body:Admin})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// ? check 
let check = async(req,res)=>{
    let {email} = req.body
        try{
            let Admin = await AdminModel.findOne({email: email})
            if(!Admin){
                res.status(201).json({message:"Admin Not found",data:false});
            }else{
                res.status(201).json({message:"Admin found",data:true});
            }
            
        }catch(err){
            res.status(400).json({message:err.message});
        }
}
module.exports = {addNewAdmin,getAllAdmins,loginAdmin,editAdminData , check}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let AdminSchema = mongoose.Schema({
    name:{
        type:String,
        maxLength:20,
        minLength:4,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        // required:true,
        unique:true,
        VarDate:function(v){
            return /^[0-9]{11}$/.test(v);
        },
        message : props=> `${props.value} is not a valid phone number..!`
    },
    role:{
        type:String,
        default:'admin'
    }
},{timestamps:true})

AdminSchema.pre('save', async function(next){
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

let AdminModel = mongoose.model('Admin',AdminSchema)
module.exports = AdminModel
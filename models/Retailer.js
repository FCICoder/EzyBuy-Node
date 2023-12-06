const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let RetailersSchema = mongoose.Schema({
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
        default:'retailer'
    },
    categories:{
        type: Array,
    },
    products:{
        type:Array,
    },
    withdrawalThreshold:{
        type:Number,
    },
    paypal:{
        type:String,
    },
    country:{
        type:String,
    },
    postal:{
        type:Number,
    }
},{timestamps:true})

RetailersSchema.pre('save', async function(next){
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

let RetailerModel = mongoose.model('Retailer',RetailersSchema)
module.exports = RetailerModel


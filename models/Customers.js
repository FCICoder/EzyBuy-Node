const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let customerSchema = mongoose.Schema({
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
    address:{
        type:String,
        // required:true
    },
    city:{
        type:String,
        // required:true
    },
    role:{
        type:String,
        default:'user' 
    },
    cart:{
        type:Array,
    },
    wishList:{
        type:Array
    },
    isPanned:{
        type: Boolean,
        default:false
    }
    
},{timestamps: true});

// ?=====> hashing the Password <======
customerSchema.pre('save', async function(next){
   let salt = await bcrypt.genSalt(10);
   let hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
    next();
})

let customerModel = mongoose.model('Customer',customerSchema);

module.exports = customerModel ; 
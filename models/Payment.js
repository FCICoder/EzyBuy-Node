const { mongoose } = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cart:{
      type:Array,
    },
    amount: {
      type: Number,
      required: true,
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
    type:String
  },
    customer_Id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Customer"
    },
   
},
{ timestamps: true });

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;

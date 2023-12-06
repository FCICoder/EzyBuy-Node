const express = require('express');
let {addNewRetailer,getRetailerInfo,getAllRetailers,loginRetailer,editRetailerData , check ,delet} = require('../controllers/Retailers')
let {auth} = require('../middlewares/auth');
const Router = express.Router();


Router.get('/',getAllRetailers )
Router.get('/info',auth,getRetailerInfo )

Router.post('/login',loginRetailer)

Router.post('/signup',addNewRetailer)

Router.patch('/',auth,editRetailerData)  

// ? check if retailer is found
Router.post('/check', check);
Router.delete('/admin/:id' , delet)
module.exports = Router
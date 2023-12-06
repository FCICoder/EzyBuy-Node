const express = require('express');
let {auth} = require('../middlewares/auth')
let {getCart,deleteProduct,emptyCart,editQuantity,totalPrice,addOldCart,replaceCart} = require('../controllers/cart')

const Router = express.Router();

Router.get('/',auth,getCart)

Router.get('/price',auth,totalPrice)

Router.patch('/',auth,addOldCart)
Router.patch('/replace',auth,replaceCart)
Router.patch('/:id',auth,deleteProduct)
Router.patch('/:id/:quantity',auth,editQuantity)

Router.delete('/',auth,emptyCart)


module.exports = Router;

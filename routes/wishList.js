const express = require('express');
let {auth} = require('../middlewares/auth')
let {addtoWishList,getWishList,deleteProduct,emptyWishList} = require('../controllers/wishList')

const Router = express.Router();

Router.post('/:id',auth,addtoWishList)

Router.get('/',auth,getWishList)

Router.patch('/:id',auth,deleteProduct)

Router.delete('/',auth,emptyWishList)

module.exports = Router;


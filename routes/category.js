const express = require('express');
let {getCategory ,getAllCategory} = require('../controllers/category')
const Router = express.Router();

Router.get('/:category',getCategory) ;
Router.get('/' ,getAllCategory) 

module.exports = Router
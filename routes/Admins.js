const express = require('express');
let {addNewAdmin,getAllAdmins,loginAdmin,editAdminData , check} = require('../controllers/Admin')
let {auth} = require('../middlewares/auth');
const Router = express.Router();


Router.get('/',getAllAdmins )

Router.post('/login',loginAdmin)

Router.post('/signup',addNewAdmin)

Router.patch('/',auth,editAdminData)  

// ? check if Admin is found
Router.post('/check', check);

module.exports = Router
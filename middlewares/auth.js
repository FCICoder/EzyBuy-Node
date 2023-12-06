const jwt = require('jsonwebtoken');

const { promisify } = require('util');
async function auth(req, res, next) {
    let authorization =  req.headers.authorization || req.body.auth || req.body.headers.authorization
    if (!authorization) {
        return res.status(401).json({message:"Please Login First dude!"})
    }
    try{
        let decoded =await promisify(jwt.verify)(authorization,process.env.SECRET);
        req.id = decoded.id;
        req.role = decoded.role;
        req.name = decoded.name;
        req.phone = decoded.phone || '';
        next();
    }catch(err){
        return res.status(401).json({message:"Please Login First hah!", data:err.message})
    }
}

module.exports = {auth};
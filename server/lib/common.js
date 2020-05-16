'use strict';
var jwt = require('jsonwebtoken'); 
const colors = require('colors');

// Validate requests 
const authorization = function (req, res, next) {
    
    let token = req.headers['authorization'];
 
    if (!token) return res.status(401).send({message: "No token provided."});

    jwt.verify(token, req.app.config.JWT_SECRET, function (err, decoded) {
        if (err) return res.status(401).send({message: "Invalid authorization token"});
        req.user = decoded;
        next();
    });
   
}

module.exports = {
    authorization
}
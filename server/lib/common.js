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

const formatResponse = function (user) {
    
    user.hashed_password && delete user.hashed_password;
    user.salt && delete user.salt;
    user.token && delete user.token;
    user.token_created_at && delete user.token_created_at;

    let baseurl = "https://www.google.com/maps/dir/?api=1";
    user.navigation_url = `${baseurl}&destination=${user.location.coordinates[1]},${user.location.coordinates[0]}&travelmode=walking`;

    return user;
}

module.exports = {
    authorization,
    formatResponse
}
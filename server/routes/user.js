'use strict'
const express = require("express");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const colors = require('colors');
const common = require('./../lib/common');
const userService = require('../services/user.service');

const router = express.Router();

// router.post('/login', userLogin);
// router.post('/signup', userSignup);
router.get('/profile', fetchUserProfile);

async function fetchUserProfile(req, res, next) {

    let userId = req.user._id;
    //let userId = "5ec11c9df093f6170816525a";
    const config = req.app.config;
    
    try {
      let user = await userService.getUserById(userId);
  
      if (_.isEmpty(user)) {
        return res.status(400).json({
          message: 'A User with this Id does not exists'
        });
      }
      return res.status(200).json({ user, message: 'success' });
  
    } catch (e) {
      console.error(colors.red(e));
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = router;
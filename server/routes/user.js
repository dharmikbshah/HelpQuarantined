'use strict'
const express = require("express");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const colors = require('colors');
const otpGenerator = require('otp-generator');
const common = require('./../lib/common');
const userService = require('../services/user.service');
const otpService = require('../lib/otpService');

const router = express.Router();

router.post('/login', userLogin);
router.post('/signup', userSignup);
router.post('/verification', verification);
router.post('/resendOTP', resendOTP);
router.get('/profile', common.authorization, fetchUserProfile);
router.put('/profile', common.authorization, updateUserProfile);


async function userLogin(req, res, next) {
  const config = req.app.config;
  let user_email = req.body.user_email;

  try {
    // check user exists or not
    let user = await userService.getUserByEmailId(user_email);
    
    if (_.isEmpty(user) || user.isVerified == false) {
      res.status(400).json({
        message: 'A user with this email id does not exist'
      });
      return;
    }
    let result = await bcrypt.compare(req.body.hashed_password,user.hashed_password);
    
    if(!result)
    {
      res.status(400).json({
        message: 'Email Id or password does not match'
      });
      return;
    }
    let response = {
      _id: user._id
    }
    //generate JWT
    const token = jwt.sign({ ...response }, config.JWT_SECRET, { expiresIn: config.EXPIRY_TIME });
    return res.status(200).json({ user: response, token, message: 'success' });
  } catch (e) {
    console.error(colors.red(e));
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function userSignup(req, res, next) {

  const config = req.app.config;
  let userInfo = req.body;

  try {
    // check for existing user
    let user = await userService.getUserByEmailId(userInfo.user_email);
    console.log(user);
    if (!_.isEmpty(user)) {
      if (user.isVerified == true) {
        res.status(400).json({
          message: 'This email id is already registered'
        });
        return;
      }
      await userService.deleteUserById(user._id);
    }
    let token = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false});
    userInfo.token = token;
    userInfo.token_created_at = new Date();
    userInfo.hashed_password = bcrypt.hashSync(userInfo.hashed_password, 10)

    userInfo = await userService.addNewUser(userInfo);

    otpService.sendOTP(userInfo.user_email, token,config);

    return res.status(200).json({ message: 'OTP is sent on your email id' });

  } catch (e) {
    console.error(colors.red(e));
    return res.status(500).json({ message: 'Internal Server Error' });
  }

}

async function verification(req, res, next) {

  const config = req.app.config;
  let user_email = req.body.user_email;
  let otp = req.body.otp;

  try {

    let user = await userService.getUserByEmailId(user_email);
    console.log(user);
    if (_.isEmpty(user)) {
      res.status(400).json({
        message: 'User with this email id is not registered'
      });
      return;
    }
    if(user.token != otp){
      res.status(400).json({
        message: 'provided OTP is invalid'
      });
      return;
    }
    let time = new Date() - Date.parse(user.token_created_at);
    console.log(time);
    if(time > config.OPT_EXPIRY_TIME){
      res.status(400).json({
        message: 'provided OTP is expired'
      });
      return;
    }

    if (user.isVerified == false) {
      let response = await userService.updateUserById(user._id, { isVerified: true });
    }
    let response = {
      _id: user._id
    }

    //generate JWT
    const token = jwt.sign({ ...response }, config.JWT_SECRET, { expiresIn: config.EXPIRY_TIME });
    return res.status(200).json({ user: response, token, message: 'success' });

  } catch (e) {
    console.error(colors.red(e));
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function resendOTP(req, res, next) {

  const config = req.app.config;
  let user_email = req.body.user_email;

  try {

    let user = await userService.getUserByEmailId(user_email);
    if (_.isEmpty(user)) {
      res.status(400).json({
        message: 'User with this email id is not registered'
      });
      return;
    }
    let doc = {
      token: otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false}),
      token_created_at: new Date()
    }
    await userService.updateUserById(user._id, doc);
    otpService.sendOTP(user_email, token,config);
    return res.status(200).json({ message: 'OTP is sent again' });

  } catch (e) {
    console.error(colors.red(e));
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

async function fetchUserProfile(req, res, next) {

    let userId = req.user._id;
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

async function updateUserProfile(req, res, next) {
    const config = req.app.config;
    let userId = req.user._id;

    try {

      let user = await userService.getUserById(userId);
      if (_.isEmpty(user)) {
        return res.status(400).json({
          message: 'A User with this Id does not exists'
        });
      }

      let response = await userService.updateUserById(userId, req.body);
      return res.status(200).json({ user: response, message: 'success' });

    } catch (e) {
      console.error(colors.red(e));
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = router;
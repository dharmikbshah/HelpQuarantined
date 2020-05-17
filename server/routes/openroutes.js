'use strict'
const express = require("express");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const colors = require('colors');
const common = require('./../lib/common');
const userService = require('../services/user.service');

const router = express.Router();

router.get('/nearby-user', getNearbyQuarantinedUsers);
//router.get('/navigation-link', generateNavigationLink);

async function getNearbyQuarantinedUsers(req, res, next) {
    
    const config = req.app.config;
  
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
  
    try {
      let users = await userService.findNearbyUsers(latitude, longitude, config.SEARCH_RADIUS);
      console.log(users);
      users = users.map(user => user.toObject());
      return res.status(200).json({ users: users, message: 'success' });
    } catch (e) {
      console.error(colors.red(e));
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  
  }

module.exports = router;
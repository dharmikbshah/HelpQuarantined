'use strict'
const express = require("express");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const colors = require('colors');
const common = require('./../lib/common');
const NotificationService = require('../services/user.service');

const router = express.Router();

// router.post('/login', userLogin);
// router.post('/signup', userSignup);
// router.get('/profile', common.authorization, fetchUserProfile);

module.exports = router;
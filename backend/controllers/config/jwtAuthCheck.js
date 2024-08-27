

var session = require("express-session");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

const config = process.env;

module.exports.checkAuthentication = (req, res, next) => {  
  const token = req.cookies['userToken'];
  if (!token && typeof token == 'undefined') {
    return next();
  }
  try {
    const decoded = jwt.verify(token, config.SESSION_SECRET);
    return res.redirect('/admin/dashboard');
  } catch (err) {
    console.log(err);
    return res.redirect('/admin');
  }
};

module.exports.isAdminLogin = async (req, res, next) => {  
  const token = req.cookies['userToken'];
  if (!token) {
    return res.redirect('/admin');
  }
  try {
      const decoded = jwt.verify(token, config.SESSION_SECRET);
      next();
  }catch (err) {
    console.log(err,'err');
    return res.redirect('/admin');
  }
};
module.exports.loggedInUserDetails = async (req, res, next) => {  
  const token = req.cookies['userToken'];
  try {
    global.loggedInUserData = "";
    if (!token && token == undefined) {
      global.loggedInUserData = "";
      return next();
    }
    const decoded = jwt.verify(token, config.SESSION_SECRET);
    let userData = await User.findById(decoded.userId);
    if(userData != null){
      global.loggedInUserData = userData;  
    }      
  }catch (err) {
    console.log(err);
    global.loggedInUserData = "";
  }
  return next();
};
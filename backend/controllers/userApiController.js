const User = require("../models/User");
const ContactUs = require("../models/ContactUs");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const global = require("../_helper/GlobalHelper");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

module.exports = {
    editProfile,
    contactUs,
    store,
    userList,
};

async function store(req, res) {
    try {
        console.log("new data")
        const { name, email,  password } = req.body;
        req.body.role =2;
        const user = await User.findOne({ email: email, isDeleted: false });
        console.log(user,"user");
        if (user) {
            return res.status(401).json({ status: false, error: 'Email is already in use!' });
        }
        await User.create(req.body);
        res.status(200).json({ status: true, message: "User created successfully!" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}
async function userList(req, res) {
    try {
        const {createdBy} = req.body;
        const objectId = new mongoose.Types.ObjectId(createdBy);
        let userData = await User.find({created_by:objectId,role:2});
        if (!userData) {
            return res.status(401).json({ status: false, data: 'Sorry ! No Data Found' });
        }
        res.status(200).json({status: true, userData:userData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function editProfile(req, res) {
    try {
        const {userId} = req.body;

        let userData = await User.findByIdAndUpdate(userId , req.body);

        if (!userData) {
            return res.status(401).json({ status: false, error: 'Sorry ! No Data Found' });
        }
        res.status(200).json({status: true, userData:userData});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}

async function contactUs(req, res) {
    try {
        await ContactUs.create(req.body);
        res.status(200).json({ status: true, message: "User created successfully!" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Something went wrong !' });
    }
}
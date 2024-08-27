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
    updateUser,
};

async function store(req, res) {
    try {
        const { name, email,  password } = req.body;
        req.body.role = 2;
        const user = await User.findOne({ email: email, isDeleted: false });
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
        console.log(mongoose.Types.ObjectId(createdBy),"hhh")
        let userData = await User.find({created_by:mongoose.Types.ObjectId(createdBy),role:2});
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
async function updateUser(req, res) {
    try {
        // const {userId} = req.body;

        // let userData = await User.findByIdAndUpdate(userId , req.body);

        // if (!userData) {
        //     return res.status(401).json({ status: false, error: 'Sorry ! No Data Found' });
        // }
        // res.status(200).json({status: true, userData:userData});

        const { userId, password } = req.body;
        const updateData = { ...req.body };
        let baseUrl = process.env.APP_URL;
        if (req.file != undefined) {
            let profileImage = updateData.profile_image;
            const filePath = "./assets/profileImage/" + profileImage;
            updateData.profile_image = req.file.filename;
            if (profileImage != "") {
              fs.exists(filePath, function (exists) {
                if (exists) {
                  fs.unlinkSync(filePath);
                } else {
                  // console.log('File not found, so not deleting.');
                }
              });
            }
            updateData.profile_image = `${req.file.filename}`;
          } else {
            delete updateData.profile_image;
          }
        if (password) {
            updateData.password = await global.securePassword(password);
        } else {
            delete updateData.password;
        }
        // Update the user data
        const userData = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (req.file != undefined) {
            userData.profile_image = `${baseUrl}/ProfileImage/${req.file.filename}`;
        }else{
            userData.profile_image = ``;
        }
        res.status(200).json({ status: true, userData });
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
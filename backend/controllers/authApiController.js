const User = require("../models/User");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const global = require("../_helper/GlobalHelper");
const jwt = require('jsonwebtoken');
const mail = require("../config/mail");
const randomstring = require("randomstring");

module.exports = {
    login,
    register,
    editProfile,
    updateProfile,
    forgetPassword,
    resetPassword,
};

async function login(req, res) {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email, isDeleted: false });
        console.log(user,"user");
        if (!user) {
            return res.status(401).json({ status: false, error: 'Incorrect Email ID or Password !' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({status: false, error: 'Incorrect Email ID or Password !' });
        }

        // if (user.status === 2) {
        //     return res.status(401).json({status: false, error: 'Your account is rejected by admin. !' });
        // }
        // if (!user.is_approve) {
        //     return res.status(401).json({status: false, error: 'Your account is not approved by admin. !' });
        // }
        
        // if (user.expiry_date && user.expiry_date < new Date()) {
        //     return res.status(401).json({status: false, error: 'Sorry! Your account is expiry' });
        // }

        const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET, {
            expiresIn: '2h',
        });

        res.status(200).json({status: true, user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
}

async function register(req, res) {
    try {
        console.log("sssssssssssss");
        const { name, email,  password } = req.body;
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

async function editProfile(req, res) {
    try {
        const { userId } = req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profileImageUrl = `${baseUrl}/ProfileImage`;

        const userData = await User.findById(userId);
        if(userData.profile_image != ''){
            userData.profile_image = `${profileImageUrl}/${userData.profile_image}`
        }
        res.status(200).json({ status: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Profile update failed' });
    }
}

async function updateProfile(req, res) {
    try {
        const { userId, password } = req.body;
        const updateData = { ...req.body };
        let baseUrl = process.env.APP_URL;
        // console.log(req.file,"DDDDDDDDDDDDDDDDDDDDD")
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
        userData.profile_image = `${baseUrl}/ProfileImage/${req.file.filename}`;
        res.status(200).json({ status: true, userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Profile update failed' });
    }
}


async function forgetPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email, isDeleted: false });
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found!' });
        }

        const randomString = randomstring.generate();
        const url = `${process.env.FRONTEND_URL}/reset-password/randomString`;
        let updated = await User.findByIdAndUpdate(user.id, {
          token: randomString,
        });
        const userName = user.name;
        let htmlString = mail.renderTemplate({ token: url,userName:userName }, "/forget.ejs");
        let mailOptions = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Reset Password",
            text: `Hello ${userName}, We got request for reset password.`,
            html: htmlString,
        };

        mail.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
        res.status(200).json({ status: true, message: "Password reset link sent to your email!" });
    } catch (error) {
        console.error('Forget password error:', error);
        res.status(500).json({ error: 'Forget password failed' });
    }
}

async function resetPassword(req, res) {
    try {
        const { token, password, confirmPassword } = req.body;
        let result = token.trim();
        let hash = await global.securePassword(password);
        if (password != confirmPassword) {
            return res.status(404).json({ status: false, error: 'Password and Confirm Password not matched!' });
        }
        let tokenData = await User.findOne({ token: result });
        if (tokenData) {
            let updated = await User.findByIdAndUpdate(tokenData.id, {
              password: hash,
              token: "",
            });
            res.status(200).json({ status: true, message: "Password Changed Successfully!" });
        }else{
            return res.status(404).json({ status: false, error: 'Sorry! This link has expired or invalid link . Please request a new password reset link to continue.' });
        }
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Reset password failed' });
    }
}
const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');

const authApiController = require('../controllers/authApiController')

const registerUserRequest = require('../requests/RegisterUser');
const loginUserRequest = require('../requests/LoginRequest');
const updateProfileRequest = require('../requests/UpdateProfileRequest');
const forgetPasswordRequest = require('../requests/ForgetPassword');
const resetPasswordRequest = require('../requests/ResetPassword');


const storageProfileImg = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './assets/ProfileImage/';
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, err => callback(err, dir));
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        console.log(file,'fileeeee')
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const newFileName = Date.now() + fileName;
        callback(null, newFileName);
    }
});

var uploadProfileImgImage = multer({
    storage: storageProfileImg,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
        }
        else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/login', loginUserRequest, authApiController.login);
router.post('/register', registerUserRequest, authApiController.register);
router.post('/forget-password',  forgetPasswordRequest, authApiController.forgetPassword);
router.post('/reset-password', resetPasswordRequest, authApiController.resetPassword);

router.post('/edit-profile', middleware.verifyToken, uploadProfileImgImage.single('profile_image'), authApiController.editProfile);
router.post('/update-profile', middleware.verifyToken, uploadProfileImgImage.single('profile_image'), updateProfileRequest, authApiController.updateProfile);

module.exports = router;

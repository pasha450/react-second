const express = require('express');
const router = express.Router();
const middleware = require('../config/middleware');
const multer = require('multer');
const fs = require('fs');

const upload = multer();

const userApiController = require('../controllers/userApiController');

const contactUsRequest = require('../requests/ContactUsRequest');

router.post('/', middleware.verifyToken, upload.none(), userApiController.userList);
router.post('/edit', middleware.verifyToken, upload.none(), userApiController.editProfile);
router.post('/update', middleware.verifyToken, upload.none(), userApiController.updateUser);
router.post('/store', middleware.verifyToken, upload.none(), userApiController.store);
router.post('/contact-us',  contactUsRequest, userApiController.contactUs);

module.exports = router;

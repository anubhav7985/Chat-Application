const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller')

router.post('/login',authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;
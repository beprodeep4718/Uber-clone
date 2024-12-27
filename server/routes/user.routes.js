const router = require('express').Router();
const { body } = require("express-validator")
const userController = require("../controller/userController");
const { authUser } = require('../middleware/auth.middleware');

router.route('/register').post([
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile', authUser, userController.getProfile);

router.get('/logout',authUser, userController.logoutUser);

module.exports = router
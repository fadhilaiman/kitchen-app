"use strict";

const router = require('express').Router();
const UserController = require('../controllers/userController');


// middleware check input confirm password
// middleware check if password and confirm password match atau tidak
const checkConfirmPassword = (req, res, next) => {
    if (!req.body.confirmPassword) {
        let error = new Error ('Confirm password field required');
        return next(error);
    } else if (req.body.confirmPassword.length < 4) {
        let error2 = new Error ('Please fill confirm password more than 4 characters!');
        return next(error2);
    } else if (req.body.password !== req.body.confirmPassword) {
        let error3 = new Error ('Password do not match, please input again');
        return next(error3);
    } else {
        return next();
    }
}

// middleware login
const checkInputLogin = (req, res, next) => {
    if (req.body.username && req.body.password) {
        return next();
    } else if (!req.body.username || !req.body.password) {
        let error = new Error ('username login and password login field required');
        return next(error);
    }
}

router.get('/', (req, res) => {
    res.render('homepage')
})

// pengecekan register
router.get('/register', UserController.registerUser);
router.post('/register', checkConfirmPassword, UserController.registerUserPost);

// pengecekan login user
router.get('/login', UserController.login)
router.post('/login', checkInputLogin, UserController.loginPost);

// logout
router.get('/logout', UserController.logout)


module.exports = router;
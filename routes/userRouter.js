const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

// Register User
router.post('/register', userCtrl.registerUser)


// Login User
router.post('/login', userCtrl.loginUser)

// verify Token
router.get('/verify', userCtrl.verifiedToken)


module.exports = router
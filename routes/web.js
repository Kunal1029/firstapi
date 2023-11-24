const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const {authRole, CheckUserAuth} = require ('../middleware/auth')

//uc
router.get('/getalluser',UserController.getAllUser)
router.post('/userinsert',UserController.userinsert)






module.exports = router
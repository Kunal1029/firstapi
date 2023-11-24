const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')


//uc
router.get('/getalluser',UserController.getalluser)
router.post('/userinsert',UserController.userinsert)






module.exports = router
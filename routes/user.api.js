const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');


router.post('/',userController.createUser);
router.post('/login',userController.loginWithEmail); //get은 바디에 정보를 넣을 수 없음. 그러나 post 는 가능
router.get('/me', authController.authenticate, userController.getUser )

module.exports = router;
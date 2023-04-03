const express=require('express');
const router=express.Router();  
const {addUser, getUser, removeUser, login } = require('../controllers/userController');

router.post('/user/add',addUser);
router.get('/user/find',getUser);
router.delete('/user/remove',removeUser);
router.post('/user/login',login);

module.exports = router;
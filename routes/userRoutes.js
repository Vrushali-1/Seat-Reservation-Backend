const express=require('express');
const router=express.Router();  
const {addUser, getUser, removeUser } = require('../controllers/userController');

router.post('/user/add',addUser);
router.post('/user/find',getUser);
router.post('/user/removeUser',removeUser);

module.exports = router;
const express=require('express');
const router=express.Router();  
const {addBus, getBus, deleteBus, getBuses } = require('../controllers/busController');

router.get('/bus/find',getBus);
router.get('/bus/findAll',getBuses);

module.exports = router;
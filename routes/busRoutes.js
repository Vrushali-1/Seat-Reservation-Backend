const express=require('express');
const router=express.Router();  
const {addBus, getBus, deleteBus, getBuses, getSeats, getBusById } = require('../controllers/busController');

router.post('/bus/find',getBus);
router.get('/bus/findAll',getBuses);
router.get('/bus/seats/find',getSeats);
router.post('/bus/remove',deleteBus);
router.post('/bus/create',addBus);
router.post('/bus/findbyId',getBusById)

module.exports = router;
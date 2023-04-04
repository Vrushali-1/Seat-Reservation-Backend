const { seatBooking } = require('../controllers/bookingController');
const express=require('express');
const router=express.Router(); 

router.post('/booking/seatbooking',seatBooking);

module.exports = router;
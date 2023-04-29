const { seatBooking, getBookingsByUser, getBookingsById, deleteBooking, updateBooking } = require('../controllers/bookingController');
const express=require('express');
const router=express.Router(); 

router.post('/booking/seatbooking',seatBooking);
router.post('/booking/findbyuser',getBookingsByUser);
router.post('/booking/findbybooking',getBookingsById);
router.post('/booking/cancelbooking', deleteBooking);
router.post('/booking/updatebooking',updateBooking);

module.exports = router;
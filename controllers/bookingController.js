const Booking = require('../models/booking');
exports.seatBooking = (req,res) => {
    Booking.findOne({where:{bus_id:req.body.bus_id,seat_id:req.body.seat_id}})
    .then((booking) =>{
        if(!booking){
            Booking.create({
                student_id:req.body.student_id,
                bus_id:req.body.bus_id,
                seat_id:req.body.seat_id,
                createdAt: new Date(),
                createdBy:req.body.email
            }).then((result) => {
                res.status(201).send({
                    message:"Booking Done!",
                    user:result
                });
            })
            .catch( error => {
                res.status(501).send({
                error:error,
               });
            });
        }else{
            res.status(500).json({
                message:"Seat Already Booked!"
           })
        }
    })
}
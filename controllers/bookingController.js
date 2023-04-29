const { SchemaTypes } = require('mongoose');
const Bus_Seat = require('../models/bus-seat');
const Booking = require('../models/booking');

exports.getBookingsByUser = async (req,res) => {
  try {
    const bookings = await Booking.findAll({
      where: { student_id:req.body.student_id },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
}

exports.getBookingsById = async (req,res) => {
  try {
    const booking = await Booking.findOne({
      where: { booking_id:req.body.booking_id },
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booking' });
  }
}

exports.deleteBooking = async (req,res) => {
    Booking.findOne({where: { booking_id: req.body.booking_id}})
      .then(async booking => {
        await Bus_Seat.destroy({ where: { booking_id: booking.booking_id } });
        await Booking.destroy({ where: {booking_id:booking.booking_id}})
        res.status(200).json({message: 'Booking Deleted'});
      })
      .catch (error => {
        res.status(500).json({ message: 'Error retrieving booking' });
     })

}

exports.seatBooking = async (req,res) => {
    const seats = req.body.seats;
    getSeatAvailability(seats,req.body.bus_id)
    .then((flag) => {
        if(flag){
            Booking.create({
                student_id:req.body.student_id,
                bus_id:req.body.bus_id,
                createdAt: new Date(),
                createdBy:req.body.email
            }).then((result) => {
                addBusSeats(result.booking_id,req.body.bus_id,seats,req.body.email)
                .then(() => {
                    res.status(201).send({
                        message:"Booking Done!",
                        booking:result
                    });
                })
                .catch((error) => {
                    console.error('Error adding seats:', error);
                    // handle error
                });
            })
            .catch( error => {
                res.status(501).send({
                error:error,
               });
            });
        }else{
            res.status(500).json({
                message:"Seat Already Booked",
            });
        }
    })
    .catch((error) => {
        console.log(error);
        // Handle the error
    });;
}

exports.updateBooking = async (req,res) => {
  Booking.findOne({where: { booking_id: req.body.booking_id}})
      .then(async booking => {
        await Bus_Seat.destroy({ where: { booking_id: booking.booking_id } });
        addBusSeats(booking.booking_id,booking.bus_id,req.body.seats,req.body.email)
          .then(() => {
                    res.status(201).send({
                        message:"Booking Updated!"
                    });
          })
          .catch((error) => {
                    console.error('Error adding seats:', error);
                    // handle error
          });
      })
      .catch (error => {
        res.status(500).json({ message: 'Error retrieving booking' });
      })
}

function getSeatAvailability(seats, bus_id) {
    return new Promise((resolve, reject) => {
      let counter = 0;
      for (const seat of seats) {
        counter++;
        Bus_Seat.findOne({ where: { bus_id: bus_id, seat_id: seat.seat_id } })
          .then((result) => {
            if (result) {
              resolve(false); // Seat is already booked
            } else if (counter == seats.length) {
              resolve(true); // All seats are available
            }
          })
          .catch((error) => {
            reject(error); // Reject the Promise if there's an error
          });
      }
    });
}

function addBusSeats(booking_id, bus_id, seats, email) {
    const promises = [];
    for (const seat of seats) {
      promises.push(
        Bus_Seat.create({
          bus_id: bus_id,
          seat_id: seat.seat_id,
          booking_id: booking_id,
          createdAt: new Date(),
          createdBy: email,
        })
      );
    }
    return Promise.all(promises);
}

const Bus = require('../models/bus');
const Seat = require('../models/seat');
const { Sequelize } = require('sequelize');
const sequelize = require('../sqldatabase');



exports.addBus = (req,res) => {
        Bus.create({
            departure:req.body.departure,
            destination:req.body.destination,
            travel_date:new Date(req.body.travel_date),
            createdAt: new Date(),
            createdBy: req.body.email
        })
        .then((result) => {
            res.status(201).send({
            message:"Bus Created!",
            bus:result
            });
        })
        .catch( err => {
            res.status(501).send({
            error:err,
                message:"Missing Parameters"
            });
        }); 
};

exports.getBus =  async (req,res) => {
    try {
        const buses = await Bus.findAll({
          where: { destination: req.body.destination, departure: req.body.departure }
        });
        
        for (const bus of buses) {
          const curDate = new Date(bus.travel_date).toISOString().split('T')[0];
          const newDate = new Date(req.body.travel_date).toISOString().split('T')[0];
          console.log('curDate', curDate, ' newDate', newDate, ' condition ', curDate, newDate);
    
          if (curDate === newDate) {
            const bookedSeats = await getBookedSeats(bus.bus_id);
    
            return res.status(200).json({
              message: 'Found',
              bus: bus,
              bookedSeats: bookedSeats
            });
          }
        }
    
        return res.status(500).json({
          message: 'Not Found'
        });
      } catch (err) {
        return res.status(500).json({
          error: err
        });
      }    
}

exports.getBuses = async (req,res) => {
    try {
        const buses = await Bus.findAll();
        console.log('buses',buses),buses;
        res.status(200).json(buses);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving buses' });
      }
}

exports.getBusById = (req,res) => {
    Bus.findOne({where:{bus_id:req.body.bus_id}})
    .then( async result => {
        if(result){
            const bookedSeats = await getBookedSeats(result.bus_id);
            res.status(200).json({
                message:'Found',
                bus:result,
                bookedSeats: bookedSeats
            });
        }
        else{
            res.status(500).json({
                message:'Not Found',
            });
        }  
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
}

exports.getSeats = async (req,res) => {
    try {
        const busSeats = await Seat.findAll();
        res.status(200).json(busSeats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving buses' });
    }
}

exports.deleteBus = async (req,res) => {
    try {
        const numDeleted = await Bus.destroy({ where: { bus_id: req.body.bus_id } });
        if (numDeleted === 0) {
            res.status(404).json({ message: 'Bus not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function getBookedSeats(bus_id) {

    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT bs.bus_id, bs.seat_id, bs.booking_id, bk.student_id
        FROM public."Bus_Seats" bs, public."Bookings" bk
        WHERE bk.booking_id = bs.booking_id AND bs.bus_id = ${bus_id}`;
        const bookedSeats = await sequelize.query(query, {
          type: Sequelize.QueryTypes.SELECT // Specify the type of query to execute
        });
        resolve(bookedSeats);
      } catch (error) {
        reject(error);
      }
    });
}
  
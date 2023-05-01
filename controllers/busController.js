const Bus = require('../models/bus');
const Bus_Seat = require('../models/bus-seat');
const Seat = require('../models/seat');



exports.addBus = (req,res) => {
    Bus.findOne({where:{bus_id:req.body.bus_id}}) 
    .then( async bus => {
      if(!bus){
          Bus.create({
            departure:req.body.departure,
            destination:req.body.destination,
            travel_date:req.body.travel_date,
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
      }else{
          res.status(500).json({
               message:"Bus exists!"
          })
      }   
    })
};

exports.getBus = (req,res) => {
    Bus.findOne({where:{destination:req.body.destination, departure:req.body.departure}})
        .then( async result => {
            const curDate = new Date(result.travel_date).toISOString().split('T')[0];
            const newDate = new Date(req.body.travel_date).toISOString().split('T')[0];
            console.log('curDate',curDate,' newDate', newDate, ' condition ', curDate, newDate);
            if(curDate == newDate){
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
        const bookedSeats = await Bus_Seat.findAll({
          where: { bus_id:bus_id },
        });
        resolve(bookedSeats);
      } catch (error) {
        reject(error);
      }
    });
}
  
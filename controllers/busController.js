const Bus = require('../models/bus');

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

    Bus.findOne({where:{bus_id:req.body.bus_id}})
        .then( result => {
        if(result){
            res.status(200).json({
                message:'Found',
                bus:result
            });
        }else{
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
        console.log('inside try');
        const buses = await Bus.findAll();
        console.log('buses',buses),buses;
        res.status(200).json(buses);
      } catch (error) {
        console.error('inside error',error);
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


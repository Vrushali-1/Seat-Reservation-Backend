const User=require('../models/user');
const Counter = require('../models/counter');

async function getNextSequenceValue(sequenceName) {
	const sequenceDocument = await Counter.findOneAndUpdate(
	  {_id: sequenceName},
	  {$inc: {sequence_value: 1}},
	  {new: true, useFindAndModify: false}
	);
	return sequenceDocument.sequence_value;
}

exports.addUser=(req,res)=>{
    User.find({email:req.body.email})
          .exec()
          .then( async user => {

            if(user.length <1){
                const user= new User({
                    user_id: await getNextSequenceValue('userId'),
                    name: req.body.name,
                    email: req.body.email,
                    password:req.body.password,
                    createdAt: new Date()
                });

                user.save()
                      .then( result => {
                           res.status(201).send({
                            message:"User Created!",
                            user:result
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
                     message:"User exists!"
                })
            }
            
        })

    
};

exports.getUser = (req,res) => {

    User.findOne({user_id:req.body.user_id})
          .exec()
          .then( result => {
            res.status(200).json({
              message:'Found',
              user:result
            });
          })
          .catch(err => {
            res.status(500).json({
               error:err
          });
      });
};

exports.login = (req,res) => {

  User.findOne({email:req.body.email})
        .exec()
        .then( result => {
          if(result.password == req.body.password){
            res.status(200).json({
              message:'Successfully Logged In!',
              user:{
                user_id: result.user_id,
                name:result.name,
                email:result.email
              }
            });
          }else{
            res.status(500).json({
              message:'Login Failed',
            });
          } 
        })
        .catch(err => {
          res.status(500).json({
             error:err
        });
    });
};

exports.removeUser = (req,res) => {
    User.deleteOne({user_id:req.body.user_id})
        .exec()
        .then(result => {
            res.status(200).json({
                message:"User deleted!",
                user:result
            });
        })
        .catch(err => {
            res.status(500).json({
                 error:err
            });
        });
}


  

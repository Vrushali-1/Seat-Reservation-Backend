const User=require('../models/user');
const Student = require('../models/student');

exports.addUser=(req,res)=>{
    Student.findOne({where:{email:req.body.email}}) 
          .then( async user => {
            if(!user){
                Student.create({
                  email: req.body.email,
                  password:req.body.password,
                  createdAt: new Date(),
                  updateAt: new Date(),
                  createdBy: req.body.email})
                      .then((result) => {
                                const object = new User({
                                  user_id: result.student_id,
                                  name: req.body.name,
                                });
                                object.save().then(() => {
                                  res.status(201).send({
                                    message:"User Created!",
                                    user:result
                                  });
                                })
                                .catch( err => {
                                  res.status(501).send({
                                  error:err,
                                 });
                               });;
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

    Student.findOne({where:{student_id:req.body.student_id}})
          .then( result => {
            if(result){
              res.status(200).json({
                message:'Found',
                user:result
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
};

exports.login = (req,res) => {

  Student.findOne({where:{email:req.body.email}})
        .then( 
          result => {
          if(result.password == req.body.password){
            User.findOne({user_id:result.student_id})
            .exec()
            .then( student => {
            res.status(200).json({
              message:'Successfully Logged In!',
              user:{
                student_id: result.student_id,
                name:student.name,
                email:result.email
              }
            });})
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
    Student.destroy({where: {student_id:req.body.student_id}})
        .then(() => {
          User.deleteOne({user_id:req.body.student_id})
          .exec()
          .then( () => {
            res.status(200).json({
              message:"User deleted!",
          });
          })
        })
        .catch(err => {
            res.status(500).json({
                 error:err
            });
        });
}


  

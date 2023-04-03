const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
	user_id:{type: Number, required:true},
	name: { type: String, required:true },
	email: { type: String, required:true },
	password: {type: String, required: true},
	createdAt: {type:Date, required:true}
});
  
module.exports = mongoose.model('User',userSchema);

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
	user_id:{type: Number, required:true},
	name: { type: String, required:true }
});
  
module.exports = mongoose.model('User',userSchema);

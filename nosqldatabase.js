
const mongoose = require("mongoose"); 
mongoose.connect(`mongodb+srv://seat-reservation:UMBC12345678@cluster1.rxfebt6.mongodb.net/seat-reservation?retryWrites=true&w=majority`,
{ useNewUrlParser: true , 
    useUnifiedTopology: true  })
.then(()=>{console.log("connected to mongodb database database")});

module.exports = mongoose
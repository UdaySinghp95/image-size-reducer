
const mongoose = require('mongoose');

console.log('--------------------Mongo URL ----------------',process.env.MONGO_URI)


function connectDB(){
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));
}


module.exports = connectDB

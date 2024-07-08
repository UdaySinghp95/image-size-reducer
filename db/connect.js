const MONGO_URI = 'mongodb://127.0.0.1:27017/image-process';
const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));
}


module.exports = connectDB
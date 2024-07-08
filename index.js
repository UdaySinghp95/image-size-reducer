const express = require('express');
const path = require('path');
const imageRoute = require('./routes/image');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config()
console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(imageRoute);

connectDB()


app.get('/check-server', (req, res) => {
  res.send('Server is Up')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const express = require('express');
const path = require('path');
const imageRoute = require('./routes/image');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config()
console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;
const { default: mongoose } = require('mongoose');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(imageRoute);

connectDB()

app.get('/', (req, res) => {
  res.send('Image Processor ,Redis will only work for development server...');
})

app.get('/check-server', (req, res) => {
  res.send('Server is Up');
})

app.get('/check-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: 'Database connection is healthy' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importing routes
const getItems = require('./routes/getItems');
const postItem = require('./routes/postItem');
const putItem = require('./routes/putItem');
const deleteItem = require('./routes/deleteItem');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Using individual routes
app.use('/items', getItems);
app.use('/items', postItem);
app.use('/items', putItem);
app.use('/items', deleteItem);

// Static Files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

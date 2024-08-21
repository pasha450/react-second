const mongoose = require('mongoose'); // mongoose required
const env = require('dotenv').config();
const poolSize = 10; // Number of connections in the pool
const database = process.env.DB_URL;

mongoose.connect(database, {
    serverSelectionTimeoutMS: 90000, // Timeout after 90s instead of 30s
});
const db = mongoose.connection; //made connection to mongoose

mongoose.connection.on('error', (err) => {
    if (err.code === 'ETIMEDOUT') {
      console.error('Connection timed out!');
    } else {
      console.error(err);
    }
  });

db.on('error',console.error.bind(console, "Error connection to mongodb"));
db.once('open',function(){
    //if connected successfully
    console.log('connected to database :: MongoDB');
});

module.exports = db;
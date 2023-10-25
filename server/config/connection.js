const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://andysu7117:zw3VGmICdaW99jYT@cluster0.nlbcmdk.mongodb.net/");

module.exports = mongoose.connection;

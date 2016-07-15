var mongoose = require( 'mongoose' );

var dbURI = process.env.dbURL;

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});


var messageSchema = new mongoose.Schema({
  username: {type: String},
  message: {type: String},
  created_at:{type:Date,default:Date.now}    
});

mongoose.model( 'Message', messageSchema,'messages' );
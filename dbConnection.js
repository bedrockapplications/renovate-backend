var mongoose = require('mongoose');


const connectDb = function (){
// Mongodb connection with the DB_URI
const database_url = process.env.DB_URI;
mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;
db.on('error', () => { 
    console.error.bind(console, 'connection error:')
    process.exit(1);
  });
db.once('open', () => {
  console.log('Connected to the Database');
});

}


module.exports = connectDb;

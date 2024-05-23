const mongoose = require('mongoose');
const {MONGO_DB_CONNECTION_STRING} = require('../config/config')
const connectionString = MONGO_DB_CONNECTION_STRING ;
const dbConnect = async()=>{
    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(connectionString);
        console.log(`Database Connected to host :${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}
module.exports = dbConnect
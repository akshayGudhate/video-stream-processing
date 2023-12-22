const mongoose = require('mongoose');       // mongoose odm
// services
const env = require("../../environment");   // environment file


//////////////////////
//    connection    //
//////////////////////

const connectDB = async () => {
    try {
        // connect to database
        await mongoose.connect(env.variables.databaseURL);

        // log message
        return console.info(env.constants.messageDatabaseConnected);
    } catch (err) {
        // log error
        console.error("Error connecting to database:", err);
        process.exit(1);
    }
};



module.exports = { connectDB };
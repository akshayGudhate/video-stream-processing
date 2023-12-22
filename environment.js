require("dotenv").config();     // environment variables


/////////////////////////
//    env variables    //
/////////////////////////

// extract environment object from process
const PEO = process.env;

// set variables
const variables = {
    // port
    port: PEO.PORT || 8080,

    // postgres url
    databaseURL: PEO.DATABASE_URL
};


// set constants
const constants = {
    // second
    second: 1000,

    // events
    events: {
        image: 'image',
        grayImage: 'grayImage',
        controlMessage: 'controlMessage'
    },

    // messages
    messageDatabaseConnected: "Connected to database!",
    messageServerStarted: "Server started successfully!",
    messageUptimeInfo: "Current uptime!",
    messageInvalidEntry: "Invalid data entered!",
    messageError: "Something went wrong!"
};



module.exports = { variables, constants };
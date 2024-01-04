const http = require('http');                       // http server
const express = require('express');                 // express server
const env = require('./environment');           	// environment file
const cors = require("cors");                       // cors for react integration
// cron
const cron = require('./src/cron/job');             // cron job
// router
const apiRouter = require('./src/routes/routes');   // router - api
// openCV
const openCV = require('./src/services/openCV');    // service - opencv
// database
const database = require('./src/database/init');    // mongo client


////////////////////////
//       severs       //
////////////////////////

const app = express();
const server = http.createServer(app);


/////////////////////////
//     middlewares     //
/////////////////////////

app.use(
    express.json(),                                 // middleware - body parser: json data
    express.urlencoded({ extended: true }),         // middleware - body parser: url-encoded data
    cors()                                          // middleware - cors for react integration
);


////////////////////////
//    start server    //
////////////////////////

(async () => {
    try {
        //
        // streamings
        //
        await database.connectDB();                 // connect to database
        cron.updateStore.start();                   // start cron job
        openCV.startStreaming(server);              // start streaming

        //
        // router
        //
        app.use('/', apiRouter);                    // router - api

        //
        // listen
        //
        server.listen(8080, () => console.info("PORT:", env.variables.port, env.constants.messageServerStarted));
    } catch (error) {
        console.error(error);
    }
})();
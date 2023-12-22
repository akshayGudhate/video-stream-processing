const http = require('http');                       // http server
const express = require('express');                 // express server
const env = require('../environment');           	// environment file
// router
const apiRouter = require('../src/routes/routes');  // router - api
// openCV
const openCV = require('../src/services/openCV');   // service - opencv


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
    express.urlencoded({ extended: true })          // middleware - body parser: url-encoded data
);


////////////////////////
//    start server    //
////////////////////////

(async () => {
    try {
        //
        // streamings
        //
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
    } finally {
        server.close();
    }
})();



module.exports = app;
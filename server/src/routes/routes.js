const path = require('path');                       // path
const router = require("express").Router();         // express router
const env = require("../../environment");           // environment file
// services
const { config } = require("../services/openCV");   // service - opencv


///////////////////////
//   server uptime   //
///////////////////////

router.get(
    "/",
    async (_req, res) => {
        try {
            // calculate uptime
            const uptimeInfo = {
                uptime: Math.ceil(process.uptime() / 60),
                date: new Date().toISOString()
            };

            // return response
            return res.status(200).json({
                info: env.constants.messageUptimeInfo,
                data: uptimeInfo
            });
        } catch (err) {
            // log error
            console.error(err);
            // return response
            return res.status(500).json({
                info: env.constants.messageError,
                error: err
            });
        }
    }
);


///////////////////////
//     serve html    //
///////////////////////

router.get('/live', (_req, res) => {
    // send html file
    res.sendFile(path.join(__dirname, '../../index.html'));
});


///////////////////////
//   change source   //
///////////////////////

router.get(
    "/switch-source/:type",
    async (req, res) => {
        try {
            // parse body
            const sourceType = req.params.type;

            // change frames per second count
            if (sourceType === 'webCamera') {
                await config.changeVideoSource(0);
            } else if (sourceType === 'videoFile') {
                await config.changeVideoSource(1);
            } else {
                return res.status(404).json({
                    info: env.constants.messageInvalidEntry,
                    data: null
                });
            }

            // redirect to home page
            // return res.redirect('/live');
            return res.status(200).json({
                info: env.constants.messageSuccess,
                data: null
            });
        } catch (err) {
            // log error
            console.error(err);
            // return response
            return res.status(500).json({
                info: env.constants.messageError,
                error: err
            });
        }
    }
);


///////////////////////
//    change fps     //
///////////////////////

router.get(
    "/change-fps/:count",
    async (req, res) => {
        try {
            // parse body
            const newFPS = req.params.count;

            if (newFPS < 1 || newFPS > 60) {
                return res.status(404).json({
                    info: env.constants.messageInvalidEntry,
                    data: null
                });
            }

            // change frames per second count
            await config.changeFramesPerSecond(newFPS);

            // redirect to home page
            // return res.redirect('/live');
            return res.status(200).json({
                info: env.constants.messageSuccess,
                data: null
            });
        } catch (err) {
            // log error
            console.error(err);
            // return response
            return res.status(500).json({
                info: env.constants.messageError,
                error: err
            });
        }
    }
);



module.exports = router;
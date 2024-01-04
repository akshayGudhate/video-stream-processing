const path = require('path');                   // path
const cv = require('@u4/opencv4nodejs');        // opencv
const socketIO = require('socket.io');          // socket.io
const dataModel = require('./controlData');   // control data
const env = require('../../environment');       // environment file


////////////////////////
//    placeholders    //
////////////////////////

// video source
let vSource = 0;
// interval
let frameInterval, framesPerSecond = 1;
// previous frames
let previousFrames = [];
// video capture
let wCap = new cv.VideoCapture(vSource);


////////////////////////
//   configurations   //
////////////////////////

const config = {
    // getters
    getCurrentSource: () => vSource === 0 ? 'webCamera' : 'videoFile',
    getCurrentFPS: () => framesPerSecond,

    // setters
    changeVideoSource: async (sourceType) => {
        try {
            // save to db
            await dataModel.saveToDB();
            // empty previous frames
            previousFrames = [];
            // switch sources
            if (sourceType === 0) {
                wCap = new cv.VideoCapture(0);
                vSource = 0;
            } else if (sourceType === 1) {
                wCap = new cv.VideoCapture(path.join(__dirname, '../../../../../Downloads/Big Buck Bunny.mp4'));
                vSource = 1;
            } else {
                throw new Error('Invalid source type');
            }
        } catch (err) {
            console.error('Error selecting video source:', err);
        }
    }
};


////////////////////////
//     cv methods     //
////////////////////////

// start streaming
const startStreaming = (server) => {
    // set io server
    const io = socketIO(server, {
        cors: {
            origin: '*',
        }
    });

    // start streaming
    frameInterval = setInterval(
        async () => {
            try {
                // capture frame
                const frame = await captureFrame();

                // process frame
                const processedData = await processFrame(frame);

                // stream data to client
                return streamEventsToClient(io, processedData);
            } catch (err) {
                console.error('Error in main process!', err);
            }
        },

        // calculate FPS
        env.constants.second / framesPerSecond
    );

    // reset interval
    config.changeFramesPerSecond = async (newFPS) => {
        try {
            // change frames per second count
            framesPerSecond = parseInt(newFPS);

            clearInterval(frameInterval);
            frameInterval = setInterval(
                async () => {
                    try {
                        // capture frame
                        const frame = await captureFrame();

                        // process frame
                        const processedData = await processFrame(frame);

                        // stream data to client
                        return streamEventsToClient(io, processedData);
                    } catch (err) {
                        console.error('Error in main process!', err);
                    }
                },

                // calculate FPS
                env.constants.second / framesPerSecond
            );
        } catch (err) {
            console.error('Error changing FPS:', err);
        }
    };
};


// capture frame
const captureFrame = async () => {
    try {
        // capture frame
        const frame = wCap.read();
        // if empty frame
        if (frame.empty) {
            console.warn('Empty frame captured');
            return wCap.reset();
        } else {
            return frame;
        }
    } catch (err) {
        console.error('Error capturing frame:', err);
    }
};


// process frame and prepare data
const processFrame = async (frame) => {
    try {
        // convert to gray scale
        const grayFrame = await frame.cvtColor(cv.COLOR_BGR2GRAY);

        // prepare data for streaming
        const image = convertFrameToImage(frame);
        const grayImage = convertFrameToImage(grayFrame);

        // calculate difference
        const diff = await calculateColorDifference(frame);
        const controlData = await dataModel.updateControlData(diff);

        // frame color
        const frameColor = frame.atRaw(200, 100);

        // push data to store
        dataModel.store.push({
            frame: frame,
            image: image,
            source: config.getCurrentSource(),
            colorData: frameColor
        });

        //
        // save frame to db(~206KB/rec)
        //
        // VideoFrameModel.create({
        //     frame: frame,
        //     image: image,
        //     source: config.getCurrentSource(),
        //     colorData: frameColor
        // });

        // set data
        // const processedData = [
        //     { event: env.constants.eventImage, content: image },
        //     { event: env.constants.eventGrayImage, content: grayImage },
        //     { event: env.constants.eventControlData, content: controlData }
        // ];
        const processedData = [image, grayImage, controlData];

        // return data
        return processedData;
    } catch (err) {
        console.error('Error processing frame:', err);
    }
};


// convert frame to image
const convertFrameToImage = (frame) => {
    try {
        // encode frame to image
        return cv.imencode('.jpg', frame).toString('base64');
    } catch (err) {
        console.error('Error converting frame to image:', err);
    }
};


// calculate color difference
const calculateColorDifference = async (frame) => {
    try {
        // if no previous frames
        if (previousFrames.length === 0) {
            // set previous frame to current frame
            previousFrames.push(frame);
            // return empty diff
            return [0, 0, 0];
        } else {
            // get previous frame
            const previousFrame = previousFrames.pop();

            // calculate diff current and previous frame
            const diff = await frame.absdiff(previousFrame).atRaw(200, 100);

            // set previous frame to current frame
            previousFrames.push(frame);

            // return diff
            return diff;
        }
    } catch (err) {
        console.error('Error calculating difference:', err);
    }
};


// stream events to client
const streamEventsToClient = (io, data) => {
    try {
        // stream data to client
        // return data.forEach(e => io.emit(e,event, e.content));
        return io.emit('data', data);
    } catch (err) {
        console.error('Error streaming data to client:', err);
    }
};



module.exports = { startStreaming, config };
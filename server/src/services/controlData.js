// models
const VideoFrameModel = require('../database/videoFrame');  // video frame model
// placeholders
const controlDataQueue = [];
// frame store
let store = [];


////////////////////////
//    control data    //
////////////////////////

const updateControlData = async (data) => {
    //
    // add colorData to controlDataQueue
    // to make it as a rolling window use queue 5 elements
    // ans remove first element if queue length is 5
    // to maintain the queue length as 5
    //
    if (controlDataQueue.length === 5) {
        // remove first element
        await controlDataQueue.shift();
    }

    // add colorData to controlDataQueue
    controlDataQueue.push(data);

    // return control data
    return JSON.stringify(controlDataQueue);
};


////////////////////////
//     store data     //
////////////////////////


// store data
const saveToDB = async () => {
    // check data availability
    if (store.length !== 0) {
        //
        // empty store first as we cant afford to loose the frames
        // if we are not able to save the frames to db
        //
        const framesBatch = store.splice(0, store.length);

        //
        // record size ~206KB
        // store multiple records to db
        // this will reduce the load on the db
        // as well as it will reduce the number of db calls
        //
        // await VideoFrameModel.insertMany(framesBatch);
        console.info('--> Data saved to mongoDB...', framesBatch.length, 'records');
    }
};



module.exports = { updateControlData, saveToDB, store, controlDataQueue };
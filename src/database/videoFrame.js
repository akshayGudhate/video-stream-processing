const mongoose = require('mongoose');    // mongoose odm


////////////////////////
// video frame schema //
////////////////////////

const videoFrameSchema = new mongoose.Schema(
    {
        frame: {
            step: { type: Number },
            elemSize: { type: Number },
            sizes: { type: Array },
            empty: { type: Number },
            depth: { type: Number },
            dims: { type: Number },
            channels: { type: Number },
            type: { type: Number },
            cols: { type: Number },
            rows: { type: Number }
        },
        image: { type: String },
        source: { type: String, enum: ['webCamera', 'videoFile'], default: 'webCamera' },
        colorData: { type: Array }
    },
    {
        timestamp: true
    }
);



module.exports = mongoose.model('VideoFrameModel', videoFrameSchema);
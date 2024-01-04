import { useState } from 'react'
import ApiCall from '../services/fetch';


/////////////////////////
//    video setting    //
/////////////////////////

const VideoSettings = () => {
    //
    // state management
    //
    const [fps, setFps] = useState(1);
    const [videoSource, setVideoSource] = useState("webCamera");

    //
    // handler functions
    //
    const handleButtonClick = async () => {
        // api calls
        await ApiCall(`switch-source/${videoSource}`);
        await ApiCall(`change-fps/${fps}`);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // set value
        const value = event.target.value;
        setFps(parseInt(value))
    };

    //
    // render
    //
    return (
        <>
            {/* heading **/}
            <h3>Change Video Settings: </h3>
            <br></br>

            {/* radio buttons **/}
            <label>
                <span>- Change Video Source: </span>
                <br></br>

                <input
                    type="radio"
                    value="webCamera"
                    checked={videoSource === "webCamera"}
                    onChange={() => setVideoSource("webCamera")}
                />
                <span> Web Camera </span>
                <br></br>

                <input
                    type="radio"
                    value="videoFile"
                    checked={videoSource === "videoFile"}
                    onChange={() => setVideoSource("videoFile")}
                />
                <span> Video File </span>
                <br></br><br></br>

                {/* input **/}
                <span>- Change FPS: </span>
                <input type="number" name="Change FPS" value={fps} min='1' max='60' onChange={handleInputChange} />
            </label><br></br><br></br>

            {/* submit button **/}
            <button onClick={handleButtonClick}> Change Video Settings </button>
        </>
    );
};



export default VideoSettings;
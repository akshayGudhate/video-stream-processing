
/////////////////////////
//        types        //
/////////////////////////

type Props = {
    image: string;
};


/////////////////////////
//     video frame     //
/////////////////////////

const VideoFrame = ({ image }: Props) => {
    //
    // render
    //
    return (
        <img
            className="image"
            src={`data:image/jpeg;base64,${image}`}
            alt="video frame image"
        />
    );
};



export default VideoFrame;
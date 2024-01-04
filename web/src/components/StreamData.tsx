import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import VideoFrame from "./VideoFrame";
import ControlData from "./ControlData";


/////////////////////////
//        types        //
/////////////////////////

type image = string;
type controlData = number[];
type Data = [image, image, controlData];


/////////////////////////
//     stream data     //
/////////////////////////

const StreamData = () => {
	//
	// state management
	//
	const [normalImage, setNormalImage] = useState("");
	const [grayImage, setGrayImage] = useState("");
	const [controlData, setControlData] = useState<controlData>([]);

	//
	// side effects
	//
	useEffect(
		() => {
			const onDataFunction = (data: Data) => {
				setNormalImage(data[0]);
				setGrayImage(data[1]);
				setControlData(data[2]);
			};

			socket.on("data", onDataFunction);

			return () => {
				socket.off('data', onDataFunction);
			};
		},

		//
		// [] ----> only once
		// no array dependency ----> infinite loop
		// [changing dependency]
		//
		[]
	);


	//
	// render
	//
	return (
		<>
			{/* heading **/}
			<h1>Real Time Video Streaming...</h1>
			<br></br>

			{/* video frames **/}
			<div className="image-wrapper">
				<VideoFrame image={normalImage} />
				<VideoFrame image={grayImage} />
			</div>
			<br></br>

			{/* control data **/}
			<ControlData controlData={controlData} />

		</>
	);
};



export default StreamData;
# Real Time Video Processing:
- This project is for real-time video frame processing and streaming. Image processing has been handled using an open-sourced OpenCV library.


### Features:
1. Capture video frames using a webcam or recorded file.
2. Process the frames and calculate the color difference.
3. Convert the frame to a normal and grayscale image.
4. Send the images and color data to the web client to display to the user.
5. Calculate the color difference for the consecutive frames and send it as control data N to N-4 frames.
6. Change the configuration of fps and video source using APIs.


### Architecture:
- In this project, a modular design is followed & has the following modules:
	1. *_Main Module_*: Handles video source selection, frame capture and processing, and data streaming.
	2. *_Config_* Module: Allows getting and changing the video source and FPS of the video.
	3. *_CaptureFrame_*: Captures and validates video frames.
	4. *_ProcessFrame_*: Converts frames to grayscale, calculates the difference, and prepares data for streaming.
	5. *_ConvertFrameToImage_*: Encodes frames as Base64 images(frame to image).
	6. *_CalculateColorDifference_*: Calculates the color difference between current and previous frames.
	7. *_StreamEventsToClient_*: Streams data to clients via Socket.io events.
	8. *_UpdateControlData_*: Processes color difference data to generate control data and manage data flow.
	9. *_saveToDB_*: It saved batch frame data to MongoDB.


### Technologies:
- *Node.js*: JavaScript runtime environment for server-side execution.
- *OpenCV*: A library for video frames and image processing.
- *Express*: Web server framework for handling client requests.
- *MongoDB*: Document Database to store the frames and processed data.
- *Socket.io*: A library for bidirectional communication and real-time streaming data.


### Future Enhancements:
1. Implement a user interface for controlling video sources, FPS, and other settings.
2. Explore advanced OpenCV techniques for color change, object detection, and motion tracking.
3. Telemetry and Error handling. Also security majors if any.
4. Add Asynchronous Architecture to handle data processing and server load efficiently.(Kafka or RabbitMQ)
5. Add file compression can be used to manage huge scale.
6. Image resolutions and processing might help to get a better User Experience.
7. CDN and Cache can manage distributed users of multiple zones.
8. Better protocols than Websocket can be explored for communication. (WebRTC, MPEG-DASH)


### Deployment:
The project can be deployed on a server with Node.js and the required dependencies installed.

Steps:
1. Clone the repository.
2. Install node.js and OpenCV globally and create an OpenCV build.
3. Go to the project directory and follow the below commands.
4. Add ```.env``` file with *(PORT=8080, DATABASE_URL=<YOUR_MONGO_URI>)* environment variables.
5. Install dependencies using npm or yarn package manager ```yarn``` or ```npm i```
6. To start the project use ```yarn dev``` or ```npm run dev```.
7. Go to ```http:localhost:8080/live``` for video processing.


### Conclusion:
This project provides a solid foundation for Video processing and streaming. This basic setup will help you to create more complex applications using openCV.

I hope this documentation provides a comprehensive overview of a project.
Feel free to ask if you have any further questions or need additional information.

Contact: akshay.gudhate@yahoo.com



## Happy Coding!

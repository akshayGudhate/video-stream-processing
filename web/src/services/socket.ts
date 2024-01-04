import { io, Socket } from "socket.io-client";
import { variables } from "../../environment";


/////////////////////////
//      websocket      //
/////////////////////////

const socket: Socket = io(variables.baseURL);



export { socket };
import { variables } from "../../environment";


/////////////////////////
//        fetch        //
/////////////////////////

const ApiCall = async (endpoint: string) => {
    const data = await fetch(`${variables.baseURL}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jsonData = await data.json();
    return jsonData.data;
};



export default ApiCall;
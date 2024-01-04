/////////////////////////
//        types        //
/////////////////////////

type Props = {
    controlData: number[];
}


//////////////////////////
//     control data     //
//////////////////////////

const ControlData = ({ controlData }: Props) => {
    //
    // render
    //
    return (
        <>
            <h3> Control Data Queue: </h3>
            <br></br>
            <span className="controlData"> {controlData} </span>
        </>
    );
};



export default ControlData;
const DepartureForm = ({editDepartureTime})=>{
    
    return (
        <form>
            <label htmlFor="hour"> hour </label>
            <input id={"hour"} type="text"  ></input>
            <label htmlFor="minutes"> minutes </label>
            <input id={"minutes"} type="text"  ></input>
            <select id={"amPm"}   >
                <option value={"am"}>am</option>
                <option value={"pm"}> pm</option>
            </select>
            <button onClick={editDepartureTime}>change</button>
        
        </form>);
}

export default DepartureForm;
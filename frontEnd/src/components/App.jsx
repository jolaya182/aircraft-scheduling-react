import { useState, useEffect } from "react";
import { apiServer, totalSecondsDay } from "../const/const";

const App = ()=> {
    const initialSchedule = []
    const [rotationSchedule, setRotationSchedule] = useState(initialSchedule );

    //processing data functions
    const processIncomingAirFligtData = (airFlightData)=>{
        const {data} = airFlightData;
        const processedFlights = data.map((flight)=>{
            const duration = flight.arrivaltime - flight.departuretime
            const percentageDifference = (duration*100)/totalSecondsDay;
            
            return {...flight, duration:duration  , percentageDifference:percentageDifference , redFlags: false, showInput:false }
        })

        setRotationSchedule(processedFlights);
    }
    // fetch data
    const fetchAirFlights = ()=>{
        fetch(apiServer).then((response)=>{ return response.json()}).then((json)=>{
            console.log("json", JSON.stringify( json));
            processIncomingAirFligtData( json );
        })
    }

    const getAircraftPercentage = ()=>{return 0;}

    const rulesEnforced = (arrivalTime, departureTime)=>{
        //areFlightsGroundedMidNight
        //areTurnAroundsEnforced
        //areFlightTimesRespected
        return true;
    }

    const areFlightsGroundedMidNight = (currentDepartureTime, newDepartureTime)=>{
        return true;
    }

    const areTurnAroundsEnforced = (currentDepartureTime, newDepartureTime)=>{
        return true;
    }

    const areFlightTimesRespected = (currentDepartureTime, newDepartureTime)=>{

    }

    useEffect(()=>{fetchAirFlights()},[])
    return(<>
        <section>
            <h1> AirCraft Schedule</h1>
        </section>
        <main>
            <section> Schedule</section>
            <section>
                {rotationSchedule.map((flight, index)=>{
                    return(
                        <div key={"flight-"+index}> {"flight-"+index} </div>
                    )
                })}
            </section>
        </main>
    </>);
}

export default App;
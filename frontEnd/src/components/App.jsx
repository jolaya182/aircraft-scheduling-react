import { useState, useEffect } from "react";
import { FLIGHTS_SERVER, AIRCRAFTS_SERVER, TOTAL_SECONDS_DAY, REST_GAP } from "../const/const";
import RotationList from "./Rotation";
import Aircrafts from "./AirCrafts";
import Flights from "./Flights";
import Paginator from "./Paginator";
import SideColumnContainer from "./SideColumnContainer";
import MiddleColumnContainer from './MiddleColumnContainer';

const App = () => {
  const initialSchedule = [];
  const [allAircrafts, setAirCrafts] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [airCraftPercentageUsage, setAirCraftPercentageUsage] = useState(0);
  const [rotationSchedule, setRotationSchedule] = useState({ 0: [] });

  const getFlightPercentage = (duration) =>
    (duration * 100) / TOTAL_SECONDS_DAY;
  const getFlightDuration = (arrivaltime, departuretime) =>
    arrivaltime - departuretime;
  const getNextDay = (currentDay) => currentDay + 1;
  const getPreviousDay = (currentDay) => currentDay - 1;
  const invalidFlightEntry = (destination, origin) => destination != origin;
  const isNextDay = (arrivaltime, nextDayDeparturetime) =>
    arrivaltime > nextDayDeparturetime;
  const findFlight = (id) =>
    rotationSchedule[currentDay].find((flight) => flight.id === id);
  const getFinalEndTime = (arrivaltime) => arrivaltime + REST_GAP;

  const getTotalFlightDuration = (rotationSchedule) =>
    Object.keys(rotationSchedule).reduce((totalDays, day) => {
      const flights = rotationSchedule[day];
      return (
        totalDays +
        flights.reduce((dayMinutes, flight) => {
          const { duration } = flight;
          return duration + dayMinutes;
        }, 0)
      );
    }, 0);

  const getAirCraftPercentageUse = (rotationSchedule) => {
    const totalMinutes = getTotalFlightDuration(rotationSchedule);
    const totalDays = Object.keys(rotationSchedule).length;
    const totalMinutesForTotalDays = totalDays * TOTAL_SECONDS_DAY;
    const result = (totalMinutes * 100) / totalMinutesForTotalDays;
    return (totalMinutes * 100) / totalMinutesForTotalDays;
  };

  //processing data functions
  const processIncomingAirFlightData = (airFlightData) => {
    const { data } = airFlightData;
    let rotationDayFlights = [];
    let day = 0;

    const newRotationScheduleProcessed = data.reduce(
      (newRotationSchedule, flight, currentDay) => {
        const { arrivaltime, departuretime } = flight;
        const { destination } = data[currentDay];
        const nextDay = getNextDay(currentDay);

        // set the flights new properties
        const duration = getFlightDuration(arrivaltime, departuretime);
        const percentageDifference = getFlightPercentage(duration);
        const finalEndTime = getFinalEndTime(arrivaltime);
        const durationPercenShowInput = {
          duration: duration,
          percentageDifference: percentageDifference,
          showInput: false,
          finalEndTime: finalEndTime,
        };

        // compare current day with the next day
        if (data[nextDay]) {
          const nextDayDeparturetime = data[nextDay].departuretime;
          const nextDayOrigin = data[nextDay].origin;

          //check if the next destination coincides with the next departure location
          // otherwise it is an invalid flight entry.
          if (invalidFlightEntry(destination, nextDayOrigin))
            return newRotationSchedule;

          rotationDayFlights.push({
            ...flight,
            ...durationPercenShowInput,
          });

          // collect all the flights that pertain to the same day
          if (isNextDay(arrivaltime, nextDayDeparturetime)) {
            newRotationSchedule[day] = rotationDayFlights;
            day += 1;
            rotationDayFlights = [];
          }

          return newRotationSchedule;
        }
        // push when you are on the last flight
        rotationDayFlights.push({
          ...flight,
          ...durationPercenShowInput,
        });
        newRotationSchedule[day] = rotationDayFlights;
        // setRotationSchedule(newRotationSchedule);
        return newRotationSchedule;
      },
      {}
    );
    setRotationSchedule(newRotationScheduleProcessed);
    setAirCraftPercentageUsage(
      getAirCraftPercentageUse(newRotationScheduleProcessed)
    );
  };

  // fetch data
  const fetchAirFlights = () => {
    fetch(FLIGHTS_SERVER)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        processIncomingAirFlightData(json);
      });
  };

  const areFlightsGroundedMidNight = (newFlight, departureTime) => {
    const { duration } = newFlight;
    const newArrivalTime = departureTime + duration;
    return newArrivalTime < TOTAL_SECONDS_DAY ? true : false;
  };

  const areTurnAroundsEnforced = (newFlight, departureTime) => {
    const { finalEndTime } = newFlight;
    return departureTime > finalEndTime ? true : false;
  };

  const rulesEnforced = (newFlight, newDepartureTime) => {
    if (
      areFlightsGroundedMidNight(newFlight, departureTime) &&
      areTurnAroundsEnforced(newFlight, departureTime)
    )
      return true;
    return false;
  };

  const setNewFlight = (flightsInCurrentDay, newFlight) => {
    return flightsInCurrentDay.map((flight) =>
      flight.id != newFlight.id ? flight : newFlight
    );
  };

  const editDepartureTime = (newDepartureTime, id) => {
    const flight = findFlight(id);
    if (!rulesEnforced(flight, newDepartureTime)) return;
    const { duration } = flight;
    const newArrivalTime = newDepartureTime + duration;
    const newFlight = {
      ...flight,
      departuretime: newDepartureTime,
      arrivaltime: newArrivalTime,
    };
    const flightsInCurrentDay = setNewFlight(
      rotationSchedule[currentDay],
      flight
    );
    const newRotationSchedule = { ...rotationSchedule };
    newRotationSchedule[currentDay] = flightsInCurrentDay;
    setRotationSchedule(newRotationSchedule);
  };

  const getFlightStartingToday = ()=>{
      const totalDays = Object.keys(rotationSchedule).length;
      const daysLeft = totalDays - currentDay;
      const flightLeft = [];
      for(let indx = currentDay; indx < daysLeft; indx += 1){
        flightLeft.push( rotationSchedule[indx]);
      }
      return flightLeft;
  }

  const processIncomingAircraftData = (aircrafts)=>{
    const {data} = aircrafts;
    setAirCrafts(data);
  }

  const fetchAirCrafts = ()=>{
    fetch(AIRCRAFTS_SERVER)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        processIncomingAircraftData(json);
      });
  }

  useEffect(() => {
    fetchAirFlights();
    fetchAirCrafts();
  }, []);

  return (
    <>
      <section>
        <Paginator></Paginator>
      </section>
      <section className="row tableHeight">
        <SideColumnContainer>
          <Aircrafts allAircrafts={allAircrafts} percentage={airCraftPercentageUsage}></Aircrafts>
        </SideColumnContainer>

        <MiddleColumnContainer>
          <RotationList
            rotationSchedule={rotationSchedule[currentDay]}
          ></RotationList>
        </MiddleColumnContainer>

        <SideColumnContainer>
          <Flights flights={getFlightStartingToday()}></Flights>
        </SideColumnContainer>
      </section>
    </>
  );
};

export default App;

import { useState, useEffect } from "react";
import {
  FLIGHTS_SERVER,
  AIRCRAFTS_SERVER,
  TOTAL_SECONDS_DAY,
  REST_GAP,
} from "../const/const";
import RotationList from "./RotationList";
import Aircrafts from "./AirCrafts";
import Flights from "./Flights";
import Paginator from "./Paginator";
import SideColumnContainer from "./SideColumnContainer";
import MiddleColumnContainer from "./MiddleColumnContainer";

const App = () => {
  const [allAircrafts, setAirCrafts] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [totalFlightDays, setTotalDays] = useState(0);
  const [airCraftPercentageUsage, setAirCraftPercentageUsage] = useState("loading");
  const [rotationSchedule, setRotationSchedule] = useState({ 0: [  {id:"loading", origin:"loading", readable_departure:"loading", destination:"loading", readable_arrival:"loading"}] });

  const getFlightPercentage = (duration) =>
  Number(((duration * 100) / TOTAL_SECONDS_DAY).toFixed(2));
  const getFlightDuration = (arrivaltime, departuretime) =>
    arrivaltime - departuretime;
  const getNextDay = (currentDay) => currentDay + 1;
  const getPreviousDay = (currentDay) => currentDay - 1;
  const setNextDay = () => {
    if (currentDay < totalFlightDays - 1) setCurrentDay(getNextDay(currentDay));
  };
  const setPrevDay = () => {
    if (currentDay > 0) setCurrentDay(getPreviousDay(currentDay));
  };
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

  const getAirCraftPercentageUse = (flights) => {
    const totalSecondsPerDay = flights.reduce((totalSeconds, flight) => {
      const { duration } = flight;
      return totalSeconds + duration + REST_GAP;
    },0);

    const result = ((totalSecondsPerDay * 100) / TOTAL_SECONDS_DAY).toFixed(2);
    return result;
  };

  //processing data functions
  const processIncomingAirFlightData = (airFlightData) => {
    const { data } = airFlightData;
    let rotationDayFlights = [];
    let totalDuration = 0;
    let day = 0;

    const newRotationScheduleProcessed = data.reduce(
      (newRotationSchedule, flight, currentDay) => {
        const { arrivaltime, departuretime } = flight;
        const { destination } = data[currentDay];
        const nextDay = getNextDay(currentDay);

        // set the flights new properties
        const duration = getFlightDuration(arrivaltime, departuretime);
        const percentageDifference = getFlightPercentage(duration);
        totalDuration += duration;
        const finalEndTime = getFinalEndTime(arrivaltime);
        const durationPercenShowInput = {
          duration: duration,
          percentageDifference: percentageDifference,
          showInput: false,
          finalEndTime: finalEndTime,
          day: day,
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
    const totalFlightDays = day + 1;
    setTotalDays(totalFlightDays);
    setRotationSchedule(newRotationScheduleProcessed);

    if (Object.keys(newRotationScheduleProcessed).length > 0)
      setAirCraftPercentageUsage(
        getAirCraftPercentageUse(newRotationScheduleProcessed[0])
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
    const result = newArrivalTime < TOTAL_SECONDS_DAY ? true : false;
    console.log("areFlightsGroundedMidNight", result);
    return newArrivalTime < TOTAL_SECONDS_DAY ? true : false;
  };

  const areTurnAroundsEnforced = (newDepartureTime) => {
    const newFinalEnd = newDepartureTime + REST_GAP;
    const dayFlights = rotationSchedule[currentDay];
    const enforced = dayFlights.every((flight) => {
      const { departuretime, finalEndTime } = flight;
      return (newDepartureTime >= departuretime &&
        newDepartureTime <= finalEndTime) ||
        (newFinalEnd >= departuretime && newFinalEnd <= finalEndTime)
        ? false
        : true;
    });

    console.log("areTurnAroundsEnforced", enforced);
    return enforced;
  };

  const isProposedDepartureAfterTomorrow = () => {
    const result = currentDay != 0 ? true : false;
    console.log("isProposedDepartureAfterTomorrow", result);
    return currentDay != 0 ? true : false;
  };

  const rulesEnforced = (newFlight, newDepartureTime) => {
    if (
      areFlightsGroundedMidNight(newFlight, newDepartureTime) &&
      areTurnAroundsEnforced(newDepartureTime) &&
      isProposedDepartureAfterTomorrow()
    )
      return true;
    return false;
  };

  const setNewFlight = (flightsInCurrentDay, newFlight) => {
    return flightsInCurrentDay.map((flight) =>
      flight.id != newFlight.id ? flight : newFlight
    );
  };

  //convert this to minutes
  const convertToSeconds = (hour, minutes, amPm) => {
    let newHour = hour > 12 ? hour - 12 : hour;
    if (amPm === "pm") newHour = hour + (12 - (12 - hour));
    return newHour * 60 * 60 + minutes * 60;
  };

  const convertMinutesToReableTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = (totalSeconds % 3600) / 60;
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes === 0 ? "00" : minutes.toString();
    var newH = hours;
    hours = hours < 10 ? "0" + hours.toString() : hours.toString();

    return hours + ":" + minutes;
  };

  const editDepartureTime = (hour, minutes, amPm, flight) => {
    if (isNaN(hour) === true || isNaN(minutes) === true) {
      alert("please enter numbers");
      return;
    }

    if (hour > 23 || minutes > 60) {
      alert("please enter hour from 0 - 23 or 1 - 12 and minutes from 0 - 59");
      return;
    }
    const newDepartureTime = convertToSeconds(hour, minutes, amPm);

    if (!rulesEnforced(flight, newDepartureTime)) return;
    const { duration } = flight;
    const newArrivalTime = newDepartureTime + duration;
    const newFinalEnd = newArrivalTime + REST_GAP;
    const readableDeparture = convertMinutesToReableTime(newDepartureTime);
    const readableArrival = convertMinutesToReableTime(newArrivalTime);
    console.log(
      "readableDeparture",
      readableDeparture,
      "readableArrival",
      readableArrival
    );
    const newFlight = {
      ...flight,
      departuretime: newDepartureTime,
      arrivaltime: newArrivalTime,
      finalEndTime: newFinalEnd,
      readable_departure: readableDeparture,
      readable_arrival: readableArrival,
    };

    const flightsInCurrentDay = setNewFlight(
      rotationSchedule[currentDay],
      newFlight
    );
    const newRotationSchedule = { ...rotationSchedule };
    newRotationSchedule[currentDay] = flightsInCurrentDay;
    setRotationSchedule(newRotationSchedule);
  };

  const getAllFlights = () => {
    return Object.keys(rotationSchedule).map((day) => {
      return rotationSchedule[day];
    }, []);
  };

  const processIncomingAircraftData = (aircrafts) => {
    const { data } = aircrafts;
    setAirCrafts(data);
  };

  const fetchAirCrafts = () => {
    fetch(AIRCRAFTS_SERVER)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        processIncomingAircraftData(json);
      });
  };

  const getRotationFlightDay = (selectedId, day) => {
    // first day cannot be edited
    if(day===0)return;
    const newRotationSchedule = {};
    Object.keys(rotationSchedule).forEach((day, index) => {
      const flights = rotationSchedule[day];
      newRotationSchedule[day] = flights.map((flight) => {
        const { id, showInput } = flight;
        return id != selectedId
          ? { ...flight, showInput: false }
          : { ...flight, showInput: !showInput };
      });
    });

    setCurrentDay(day);
    // airCraftPercentageUsage
    setRotationSchedule(newRotationSchedule);
    setAirCraftPercentageUsage(getAirCraftPercentageUse(newRotationSchedule[day]))
  };

  useEffect(() => {
    fetchAirFlights();
    fetchAirCrafts();
  }, []);

  return (
    <div className={"tableHeight"}>
      <section>
        <Paginator
          setNextDay={setNextDay}
          setPrevDay={setPrevDay}
          currentDay={currentDay}
        ></Paginator>
      </section>
      <section className="row">
        <SideColumnContainer>
          <Aircrafts
            allAircrafts={allAircrafts}
            percentage={airCraftPercentageUsage}
          ></Aircrafts>
        </SideColumnContainer>

        <MiddleColumnContainer>
          <RotationList
            rotationSchedule={rotationSchedule[currentDay]}
          ></RotationList>
        </MiddleColumnContainer>

        <SideColumnContainer>
          <Flights
            flights={getAllFlights()}
            getRotationFlightDay={getRotationFlightDay}
            editDepartureTime={editDepartureTime}
          ></Flights>
        </SideColumnContainer>
      </section>
    </div>
  );
};

export default App;

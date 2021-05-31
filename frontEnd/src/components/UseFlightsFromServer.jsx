/**
 * title: UseFlightsFromServer.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: hook that has the logic to handle the flight api call
 */
import { useState, useEffect } from 'react';
import { TOTAL_SECONDS_DAY, REST_GAP, DEFAULT_SCHEDULE } from '../const/const';

const UseFlightsFromServer = (FLIGHTS_SERVER) => {
  const [airCraftPercentageUsage, setAirCraftPercentageUsage] = useState('loading');
  const [currentDay, setCurrentDay] = useState(0);
  const [totalFlightDays, setTotalDays] = useState(0);
  const [rotationSchedule, setRotationSchedule] = useState(DEFAULT_SCHEDULE);

  const getFlightPercentage = (duration) => Number(((duration * 100) / TOTAL_SECONDS_DAY).toFixed(2));
  const getFlightDuration = (arrivaltime, departuretime) =>arrivaltime - departuretime;
  const getNextDay = (currentDay) => currentDay + 1;
  const getPreviousDay = (currentDay) => currentDay - 1;

  const setNextDay = () => {if (currentDay < totalFlightDays - 1) setCurrentDay(getNextDay(currentDay));};
  const setPrevDay = () => {if (currentDay > 0) setCurrentDay(getPreviousDay(currentDay));};

  const invalidFlightEntry = (destination, origin) => destination != origin;
  const hasReachedNextDay = (arrivaltime, nextDayDeparturetime) =>arrivaltime > nextDayDeparturetime;
  const getFinalEndTime = (arrivaltime) => arrivaltime + REST_GAP;

  const getAirCraftPercentageUse = (flights) => {
    const totalSecondsPerDay = flights.reduce((totalSeconds, flight) => {
      const { duration } = flight;
      return totalSeconds + duration + REST_GAP;
    }, 0);

    const result = ((totalSecondsPerDay * 100) / TOTAL_SECONDS_DAY).toFixed(2);
    return result;
  };

  const adddDurationPercentInputEndtimeDayProperties = (
    arrivaltime,
    departuretime,
    day
  ) => {
    const duration = getFlightDuration(arrivaltime, departuretime);
    const percentageDifference = getFlightPercentage(duration);
    const finalEndTime = getFinalEndTime(arrivaltime);
    const flightWithNewProperties = {
      duration: duration,
      percentageDifference: percentageDifference,
      showInput: false,
      finalEndTime: finalEndTime,
      day: day
    };
    return flightWithNewProperties;
  };

  const seperateFlightsByDay = (
    data,
    dayDurationRotationFlightProcessedScheduledObj
  ) => {
    return data.reduce(
      (newRotationScheduleObj, flight, currentDay, flightsArray) => {
        let {
          newRotationScheduleProcessed,
          rotationDayFlights,
          totalDuration,
          day
        } = newRotationScheduleObj;

        const { arrivaltime, departuretime, destination } = flight;
        const nextDay = getNextDay(currentDay);

        // set the flights new properties
        const flightWithNewProperties =
          adddDurationPercentInputEndtimeDayProperties(
            arrivaltime,
            departuretime,
            day
          );
        totalDuration += flightWithNewProperties.duration;

        // compare current day with the next day
        if (flightsArray[nextDay]) {
          const nextDayDeparturetime = flightsArray[nextDay].departuretime;
          const nextDayOrigin = flightsArray[nextDay].origin;

          //check if the next destination coincides with the next departure location
          // otherwise it is an invalid flight entry.
          if (invalidFlightEntry(destination, nextDayOrigin))
            return newRotationScheduleObj;

          rotationDayFlights.push({
            ...flight,
            ...flightWithNewProperties
          });

          // collect all the flights that pertain to the same day
          if (hasReachedNextDay(arrivaltime, nextDayDeparturetime)) {
            newRotationScheduleProcessed[day] = rotationDayFlights;
            day += 1;
            rotationDayFlights = [];
          }

          return {
            ...newRotationScheduleObj,
            newRotationScheduleProcessed,
            rotationDayFlights,
            totalDuration,
            day
          };
        }
        // push when you are on the last flight
        rotationDayFlights.push({
          ...flight,
          ...flightWithNewProperties
        });
        newRotationScheduleProcessed[day] = rotationDayFlights;
        return {
          ...newRotationScheduleObj,
          newRotationScheduleProcessed,
          rotationDayFlights,
          totalDuration,
          day
        };
      },
      dayDurationRotationFlightProcessedScheduledObj
    );
  };

  const getFlightsProcessed = (data) => {
    let dayDurationRotationFlightProcessedScheduledObj = {
      newRotationScheduleProcessed: {},
      rotationDayFlights: [],
      totalDuration: 0,
      day: 0
    };
    const newRotationSchedule = seperateFlightsByDay(
      data,
      dayDurationRotationFlightProcessedScheduledObj
    );
    const { newRotationScheduleProcessed, day } = newRotationSchedule;
    const totalFlightDays = day === 0 ? 0 : day + 1;
    return { totalFlightDays, newRotationScheduleProcessed };
  };

  //processing data functions
  const processIncomingAirFlightData = (airFlightData) => {
    const { data } = airFlightData;
    const { totalFlightDays, newRotationScheduleProcessed } = getFlightsProcessed(data);
    setTotalDays(totalFlightDays);
    setRotationSchedule(newRotationScheduleProcessed);

    if (totalFlightDays > 0) {
      const aircraftPercentage = getAirCraftPercentageUse(
        newRotationScheduleProcessed[0]
      );
      setAirCraftPercentageUsage(aircraftPercentage);
    }
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
    const areFlightsGroundedMidNightEnforeced =
      newArrivalTime < TOTAL_SECONDS_DAY ? true : false;
    return areFlightsGroundedMidNightEnforeced;
  };

  const areTurnAroundsEnforced = (newDepartureTime) => {
    const newFinalEnd = newDepartureTime + REST_GAP;
    const dayFlights = rotationSchedule[currentDay];
    const isTurnAroundEnforced = dayFlights.every((flight) => {
      const { departuretime, finalEndTime } = flight;
      return (newDepartureTime >= departuretime &&
        newDepartureTime <= finalEndTime) ||
        (newFinalEnd >= departuretime && newFinalEnd <= finalEndTime)
        ? false
        : true;
    });

    return isTurnAroundEnforced;
  };

  const isProposedDepartureAfterTomorrow = () => {
    const isScheduleAfterTomorrow = currentDay != 0 ? true : false;
    return isScheduleAfterTomorrow;
  };

  const areRulesEnforced = (newFlight, newDepartureTime) => {
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
    if (amPm === 'pm') newHour = hour + (12 - (12 - hour));
    const convertedSeconds = newHour * 60 * 60 + minutes * 60;
    return convertedSeconds;
  };

  const convertMinutesToReableTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = (totalSeconds % 3600) / 60;
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes === 0 ? '00' : minutes.toString();
    var newH = hours;
    hours = hours < 10 ? '0' + hours.toString() : hours.toString();
    const convertedReadableTime = hours + ':' + minutes;
    return convertedReadableTime;
  };

  const isInputValid = (hour, minutes) => {
    if (isNaN(hour) === true || isNaN(minutes) === true) {
      alert('please enter numbers');
      return false;
    }

    if (hour > 23 || minutes > 60) {
      alert('please enter hour from 0 - 23 or 1 - 12 and minutes from 0 - 59');
      return false;
    }

    return true;
  };

  const getNewArrivalTime = (newDepartureTime, duration) =>
    newDepartureTime + duration;
  const getNewFinalEnd = (newArrivalTime) => newArrivalTime + REST_GAP;

  const editDepartureTime = (hour, minutes, amPm, flight) => {
    if (!isInputValid(hour, minutes)) return;

    const newDepartureTime = convertToSeconds(hour, minutes, amPm);

    if (!areRulesEnforced(flight, newDepartureTime)) return;

    const { duration } = flight;
    const newArrivalTime = getNewArrivalTime(newDepartureTime, duration);
    const newFinalEnd = getNewFinalEnd(newArrivalTime);
    const readableDeparture = convertMinutesToReableTime(newDepartureTime);
    const readableArrival = convertMinutesToReableTime(newArrivalTime);

    const newFlight = {
      ...flight,
      departuretime: newDepartureTime,
      arrivaltime: newArrivalTime,
      finalEndTime: newFinalEnd,
      readable_departure: readableDeparture,
      readable_arrival: readableArrival
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

  const getRotationFlightDay = (selectedId, day) => {
    // first day cannot be edited
    if (day === 0) return;
    const newRotationSchedule = {};

    Object.keys(rotationSchedule).forEach((day) => {
      const flights = rotationSchedule[day];
      newRotationSchedule[day] = flights.map((flight) => {
        const { id, showInput } = flight;
        return id != selectedId
          ? { ...flight, showInput: false }
          : { ...flight, showInput: !showInput };
      });
    });

    setCurrentDay(day);
    setRotationSchedule(newRotationSchedule);
    setAirCraftPercentageUsage(
      getAirCraftPercentageUse(newRotationSchedule[day])
    );
  };

  useEffect(() => {
    fetchAirFlights();
  }, []);

  return {
    currentDay,
    rotationSchedule,
    airCraftPercentageUsage,
    setNextDay,
    setPrevDay,
    getAllFlights,
    getRotationFlightDay,
    editDepartureTime
  };
};

export default UseFlightsFromServer;

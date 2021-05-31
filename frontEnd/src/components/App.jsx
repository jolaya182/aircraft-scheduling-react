/**
 * title: App.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: holds the entire application in this component
 */
import StateContext from './StateContext';
import {
  FLIGHTS_SERVER,
  AIRCRAFTS_SERVER,
  TOTAL_SECONDS_DAY,
  REST_GAP,
  REST_GAP_PERCENTAGE,
} from '../const/const';
import RotationList from './RotationList';
import Aircrafts from './AirCrafts';
import Flights from './Flights';
import Paginator from './Paginator';
import ColumnContainer from './ColumnContainer';
import AirportHeader from './AirportHeader';
import UseFlightsFromServer from './UseFlightsFromServer';
import UseAircraftsFromServer from './UseAircraftsFromServer';
const App = () => {
  const state = {
    restGapPercentage: REST_GAP_PERCENTAGE,
    restGap: REST_GAP,
    totalSecondsDay: TOTAL_SECONDS_DAY
  };

  const {
    currentDay,
    rotationSchedule,
    airCraftPercentageUsage,
    setNextDay,
    setPrevDay,
    getAllFlights,
    getRotationFlightDay,
    editDepartureTime
  } = UseFlightsFromServer(FLIGHTS_SERVER);
  const { allAircrafts, currentAircraft } =
    UseAircraftsFromServer(AIRCRAFTS_SERVER);
  return (
    <StateContext.Provider value={{ state }}>
      <section>
        <Paginator
          setNextDay={setNextDay}
          setPrevDay={setPrevDay}
          currentDay={currentDay}
        ></Paginator>
      </section>

      <AirportHeader currentAircraft={currentAircraft}></AirportHeader>

      <section className="airport-row">
        <ColumnContainer wide={false}>
          <Aircrafts
            allAircrafts={allAircrafts}
            percentage={airCraftPercentageUsage}
          ></Aircrafts>
        </ColumnContainer>
        <ColumnContainer wide={true}>
          <RotationList
            rotationSchedule={rotationSchedule[currentDay]}
          ></RotationList>
        </ColumnContainer>

        <ColumnContainer wide={false}>
          <Flights
            flights={getAllFlights()}
            getRotationFlightDay={getRotationFlightDay}
            editDepartureTime={editDepartureTime}
          ></Flights>
        </ColumnContainer>
      </section>
    </StateContext.Provider>
  );
};

export default App;

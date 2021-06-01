/**
 * title: Flights.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: flight cards that holds the flights location and time
 */
import FlightLocationTime from './FlightLocationTime';
import DepartureForm from './DepartureForm';
import { Card } from 'react-bootstrap';

/**
 *
 *
 * @param {Array, function, function} { flights, getRotationFlightDay, editDepartureTime }
 * @return {Component} 
 */
const Flights = ({ flights, getRotationFlightDay, editDepartureTime }) => {
  return (
    <>
      <main>
        <section className={"flight-box"}>
          {flights.map((flightsPerDay, index) => {
            return (
              <Card key={"outterFlight-" + index} style={{ width: `${100}%` }}>
                <Card.Body>
                  {flightsPerDay.map((flight, innerIndx) => {
                    const {
                      id,
                      origin,
                      readable_departure,
                      destination,
                      readable_arrival,
                      day,
                      showInput,
                    } = flight;
                    return (
                      <div key={"flight-" + innerIndx}>
                        <div onClick={() => getRotationFlightDay(id, day)}>
                          <main> {id} </main>
                          <FlightLocationTime
                            origin={origin}
                            readable_departure={readable_departure}
                            destination={destination}
                            readable_arrival={readable_arrival}
                            day={day}
                          ></FlightLocationTime>
                        </div>
                        {showInput && (
                          <DepartureForm
                            editDepartureTime={(e) => {
                              e.preventDefault();
                              const hour = e.target.form[0].value;
                              const minutes = e.target.form[1].value;
                              const amPm = e.target.form[2].value;
                              editDepartureTime(hour, minutes, amPm, flight);
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            );
          })}
        </section>
      </main>
    </>
  );
};
export default Flights;

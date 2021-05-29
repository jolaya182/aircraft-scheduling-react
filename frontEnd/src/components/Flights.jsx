import FlightLocationTime from "./FlightLocationTime";
import DepartureForm from "./DepartureForm";

const Flights = ({ flights, getRotationFlightDay, editDepartureTime }) => {
  //
  return (
    <>
      <main>
        <section>flights</section>
        <section>
          {flights.map((flightsPerDay, index) => {
            return (
              <div key={"outterFlight-" + index}>
                <div> Day: {index} </div>
                {flightsPerDay.map((flight, innerIndx) => {
                  const {
                    id,
                    origin,
                    departuretime,
                    destination,
                    arrivaltime,
                    day,
                    showInput,
                  } = flight;
                  return (
                    <div key={"flight-" + innerIndx}>
                      <div onClick={() => getRotationFlightDay(id, day)}>
                        <section> {id} </section>
                        <FlightLocationTime
                          location={origin}
                          time={departuretime}
                        ></FlightLocationTime>
                        <FlightLocationTime
                          location={destination}
                          time={arrivaltime}
                        ></FlightLocationTime>
                      </div>
                      {showInput && (
                        <DepartureForm
                          editDepartureTime={(e) => {
                            e.preventDefault();
                            const hour = e.target.form[0].value;
                            const minutes = e.target.form[1].value;
                            const amPm = e.target.form[2].value;
                            editDepartureTime( hour, minutes, amPm, flight);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};
export default Flights;

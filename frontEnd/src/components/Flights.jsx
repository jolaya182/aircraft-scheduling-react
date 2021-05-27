import FlightLocationTime from "./FlightLocationTime";

const Flights = ({ flights }) => {
  //
  console.log();
  return (
    <>
      <main>
        <section>flights</section>
        <section>
          {flights.map((day, index) => {
            return (
              <div key={"outterFlight-"+index}>
                <div> Day: {index} </div>
                {day.map((flight, innerIndx) => {
                  const {
                    id,
                    origin,
                    departuretime,
                    destination,
                    arrivaltime,
                  } = flight;
                  return (
                    <div key={"flight-"+innerIndx}>
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

import FlightLocationTime from "./FlightLocationTime";
const FlightRotation = ({ flight }) => {
  const { id, origin, readable_departure, destination, readable_arrival } = flight;
  return (
    <div className="airport-row">
      <div className="airport-row">
        <section>Flight: {id} </section>
      </div>
      <div className={"airport-row"}>
        <FlightLocationTime
          location={origin}
          time={readable_departure}
        ></FlightLocationTime>
        <div> ---- </div>
        <FlightLocationTime
          location={destination}
          time={readable_arrival}
        ></FlightLocationTime>
      </div>

    </div>
  );
};
export default FlightRotation;

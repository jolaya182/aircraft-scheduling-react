import FlightLocationTime from "./FlightLocationTime";
const FlightRotation = ({ flight }) => {
  const { id, origin, readable_departure, destination, readable_arrival } = flight;
  return (
    <div className="row">
      <div className="row">
        <section>Flight: {id} </section>
      </div>
      <div className={"row"}>
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

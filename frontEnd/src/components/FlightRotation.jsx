import FlightLocationTime from "./FlightLocationTime";
const FlightRotation = ({ flight }) => {
  const { id, origin, departuretime, destination, arrivaltime } = flight;
  return (
    <div className="row">
      <div className="row">
        <section>Flight: {id} </section>
      </div>
      <div className={"row"}>
        <FlightLocationTime
          location={origin}
          time={departuretime}
        ></FlightLocationTime>
        <div> ---- </div>
        <FlightLocationTime
          location={destination}
          time={arrivaltime}
        ></FlightLocationTime>
      </div>
    </div>
  );
};
export default FlightRotation;

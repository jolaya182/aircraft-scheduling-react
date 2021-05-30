import FlightLocationTime from "./FlightLocationTime";
const RotationFlight = ({ flight }) => {
  const {  origin, readable_departure, destination, readable_arrival, day } =
    flight;
  return (

      <section
        className={
          day != 0 ? "flight-location-time airport-row" : "airport-row"
        }
      >
        <div className={"airport-col "}>
          <div className={" "}>{origin}</div>
          <div className={" "}>{readable_departure}</div>
        </div>
        <div className={"airport-col arrow"}>
          {"----->"}
        </div>
        <div className={"airport-col "}>
          <div className={" flightBoxColDestination"}>{destination}</div>
          <div className={" flightBoxColDestination"}>{readable_arrival}</div>
        </div>
      </section>
  );
};
export default RotationFlight;

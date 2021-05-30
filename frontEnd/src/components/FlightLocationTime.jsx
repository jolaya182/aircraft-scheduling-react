const FlightLocationTime = ({
  origin,
  departuretime,
  destination,
  arrivaltime,
  day
}) => {
  return (
    <section
      className={day != 0 ? "flight-location-time airport-row" : "airport-row"}
    >
      <div className={"airport-col "}>
        <div className={" "}>{origin}</div>
        <div className={" "}>{departuretime}</div>
      </div>
      <div className={"airport-col "}>
        <div className={" flightBoxColDestination"}>{destination}</div>
        <div className={" flightBoxColDestination"}>{arrivaltime}</div>
      </div>
    </section>
  );
};
export default FlightLocationTime;

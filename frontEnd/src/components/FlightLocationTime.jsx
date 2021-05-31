/**
 * title: FlightLocationTime.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: component to display departure arrival time and locations
 */
const FlightLocationTime = ({
  origin,
  readable_departure,
  destination,
  readable_arrival,
  day,
}) => {
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
      <div className={"airport-col "}>
        <div className={" flight-box-col-destination"}>{destination}</div>
        <div className={" flight-box-col-destination"}>{readable_arrival}</div>
      </div>
    </section>
  );
};
export default FlightLocationTime;

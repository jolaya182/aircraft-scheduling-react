/**
 * title: RotationFlight.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: the flight in the rotation list
 */
import arrow from '../../images/arrow.svg';
/**
 *
 *
 * @param {object} { flight }
 * @return {Component} 
 */
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
        <img  src={arrow} className={"airport-col arrow"}>
        </img>
        <div className={"airport-col "}>
          <div className={" flight-box-col-destination"}>{destination}</div>
          <div className={" flight-box-col-destination"}>{readable_arrival}</div>
        </div>
      </section>
  );
};
export default RotationFlight;

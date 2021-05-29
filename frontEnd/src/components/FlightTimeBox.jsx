import {  REST_GAP_PERCENTAGE} from "../const/const";

const FlightTimeBox = ({ percentageDifference, color, idleDistancePercentage, lastIdlePercentage }) => {
  return (
    < >
      <div className={ `grey-color  flightBox` } style={{wdith:`${idleDistancePercentage}%`}}>
      </div>

      <div
        className={`${color}-color flightBox `}
        style={{ width: `${percentageDifference}%` }}
      ></div>

      <div
        className={"purple-color flightBox "}
        style={{ width: `${REST_GAP_PERCENTAGE}%` }}
      ></div>

      {
        lastIdlePercentage && <div
        style={{ width: `${lastIdlePercentage}%` }}
        ></div>
      }
    </>
  );
};
export default FlightTimeBox;

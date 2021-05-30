import {  REST_GAP_PERCENTAGE} from "../const/const";

const RotationTimeBox = ({ percentageDifference, color, idleDistancePercentage, lastIdlePercentage }) => {
  return (
    < >
      <div name={"idleDistancePercentage" }className={ `flight-time-box-base-grey-color  flightBox` } style={{width:`${idleDistancePercentage}%`}}>
      </div>

      <div
        className={`flight-time-box-base-${color}-color flightBox `}
        style={{ width: `${percentageDifference}%` }}
      ></div>

      <div
        className={"flight-time-box-base-purple-color flightBox "}
        style={{ width: `${REST_GAP_PERCENTAGE}%` }}
      ></div>

      {
        (lastIdlePercentage != false) ? <div name={"lastIdlePercentage"}
        className={ `flight-time-box-base-grey-color  flightBox` }
        style={{ width: `${lastIdlePercentage}%` }}
        ></div> : ""
      }
    </>
  );
};
export default RotationTimeBox;

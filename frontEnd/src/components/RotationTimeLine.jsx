import RotationTimeBox from "./RotationTimeBox";
import {  TOTAL_SECONDS_DAY } from "../const/const";

const RotationTimeLine = ({ rotationSchedule }) => {
  return (
    <div className={"row flightBox"}>
      <div className={"col"}>
        <div className={"row flightBox"}>
          <div className={"col"}>00:00</div>
          <div className={"col"}>12:00</div>
        </div>

        <div className={"row flightBox"}>
          <div className={"chron-line col"}> </div>
          <div className={"chron-line col"}> </div>
        </div>

        <div className={"row flightBox"}>
          {rotationSchedule.map((flight, index, rotationArray) => {
            let idleStart = 0;
            if (index != 0) {
              idleStart = rotationArray[index - 1].arrivaltime;
            }
            const { departuretime } = flight;
            const idleDistance = departuretime - idleStart;
            const idleDistancePercentage = (
              (idleDistance * 100) /
              TOTAL_SECONDS_DAY
            );
            const  {percentageDifference}  = flight;
            const oddEvenColor = index % 2 == 0 ? "green" : "orange";
            const lastIdlePercentage =
              index === rotationArray.length - 1
                ? (
                    ((TOTAL_SECONDS_DAY - rotationArray[index].arrivaltime) *
                      100) /
                    TOTAL_SECONDS_DAY
                  )
                : false;

            let result = percentageDifference + idleDistancePercentage
            return (
              <RotationTimeBox
                key={"flight-rotion-graph-" + index}
                percentageDifference={percentageDifference}
                color={oddEvenColor}
                idleDistancePercentage={idleDistancePercentage}
                lastIdlePercentage={lastIdlePercentage}
              ></RotationTimeBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RotationTimeLine;

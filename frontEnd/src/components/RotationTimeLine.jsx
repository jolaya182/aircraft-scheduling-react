/**
 * title: RotationTimeLine.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: graphical presentation of the rotation flight on a timeline
 */
import RotationTimeBox from './RotationTimeBox';
import { useContext } from 'react';
import StateContext from './StateContext';
/**
 *
 *
 * @param {object} { rotationSchedule }
 * @return {Component} 
 */
const RotationTimeLine = ({ rotationSchedule }) => {
  const {state} = useContext(StateContext);
  const {totalSecondsDay} = state;
  return (
    <div className={"airport-row flight-box"}>
      <div className={"airport-col"}>
        <div className={"airport-row flight-box"}>
          <div className={"airport-col"}>00:00</div>
          <div className={"airport-col"}>12:00</div>
        </div>

        <div className={"airport-row flight-box"}>
          <div className={"chron-line airport-col"}> </div>
          <div className={"chron-line airport-col"}> </div>
        </div>

        <div className={"airport-row flight-box"}>
          {rotationSchedule.map((flight, index, rotationArray) => {
            let idleStart = 0;
            if (index != 0) {
              idleStart = rotationArray[index - 1].arrivaltime;
            }
            const { departuretime } = flight;
            const idleDistance = departuretime - idleStart;
            const idleDistancePercentage = (
              (idleDistance * 100) /
              totalSecondsDay
            );
            const  {percentageDifference}  = flight;
            const oddEvenColor = index % 2 == 0 ? "green" : "orange";
            const lastIdlePercentage =
              index === rotationArray.length - 1
                ? (
                    ((totalSecondsDay - rotationArray[index].arrivaltime) *
                      100) /
                    totalSecondsDay
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

import FlightTimeBox from "./FlightTimeBox";
import { REST_GAP_PERCENTAGE, TOTAL_SECONDS_DAY } from "../const/const";

const FlightTimeLine = ({ rotationSchedule }) => {
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
            console.log("rotAra", rotationArray);
            let idleStart = 0;
            if (index != 0) {
              idleStart = rotationArray[index - 1].arrivaltime;
            }
            const { departuretime, duration } = flight;
            console.log("duration", duration);
            console.log("idleStart", idleStart);
            console.log("departuretime", departuretime);
            
            const idleDistance = departuretime - idleStart;
            console.log("idleDistance", idleDistance);
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
                console.log("idleDistancePercentage-> ", idleDistancePercentage);
                console.log("percentageDifference-> ", percentageDifference);
            console.log("lastIdlePercentage-> ", lastIdlePercentage);
            let result = percentageDifference + idleDistancePercentage
            if(lastIdlePercentage){ const newResult = percentageDifference + idleDistancePercentage + lastIdlePercentage; console.log("total percentage", newResult)}else{ console.log("total percentage" , result)}
            return (
              <FlightTimeBox
                key={"flight-rotion-graph-" + index}
                percentageDifference={percentageDifference}
                color={oddEvenColor}
                idleDistancePercentage={idleDistancePercentage}
                lastIdlePercentage={lastIdlePercentage}
              ></FlightTimeBox>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FlightTimeLine;

import FlightRotation from "./FlightRotation";
import RotationTimeLine from "./RotationTimeLine";
const RotationList = ({ rotationSchedule }) => {
  return (
    <>
      <main>
        <section>rotation</section>
        <section>
          {rotationSchedule.map((flight, index) => {
            return (
              <FlightRotation key={"flight-" + index} flight={flight} > 
              </FlightRotation>
            );
          })}
        </section>
          <RotationTimeLine rotationSchedule={rotationSchedule}></RotationTimeLine>
      </main>
    </>
  );
};

export default RotationList;

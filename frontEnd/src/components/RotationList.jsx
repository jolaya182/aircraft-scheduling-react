import FlightRotation from "./FlightRotation";
import FlightTimeLine from "./FlightTimeLine";
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
          <FlightTimeLine rotationSchedule={rotationSchedule}></FlightTimeLine>
      </main>
    </>
  );
};

export default RotationList;

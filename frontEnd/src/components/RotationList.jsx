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
              <FlightRotation key={"flight-" + index} flight={flight}>
                {" "}
                {"flight-" + index}{" "}
              </FlightRotation>
            );
          })}
        </section>
        <section>
          <FlightTimeLine></FlightTimeLine>
        </section>
      </main>
    </>
  );
};

export default RotationList;

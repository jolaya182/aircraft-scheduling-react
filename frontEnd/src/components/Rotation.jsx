import FlightRotation from "./FlightRotation";
const RotationList = ({ rotationSchedule }) => {
  return (
    <>
        <main>
             <section>rotation</section>   
            <section> 
      {rotationSchedule.map((flight, index) => {
        return <FlightRotation key={"flight-" + index} flight={flight}> {"flight-" + index} </FlightRotation>;
      })}


            </section>
            </main>
    </>
  );
};

export default RotationList;

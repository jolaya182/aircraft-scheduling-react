/**
 * title: RotationList.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: displays all the flights scheduled for the selected day
 */
import RotationFlight from './RotationFlight';
import RotationTimeLine from './RotationTimeLine';
import { Card } from 'react-bootstrap';

const RotationList = ({ rotationSchedule }) => {
  return (
    <>
      <main>
        <section className={"flight-box"}>
          {rotationSchedule.map((flight, index) => {
            const { id } = flight;
            return (
              <Card key={"RotationList-" + index} style={{ width: `${100}%` }}>
                <Card.Body>
                  <div>Flight: {id} </div>
                  <RotationFlight
                    key={"flight-" + index}
                    flight={flight}
                  ></RotationFlight>
                </Card.Body>
              </Card>
            );
          })}
        </section>
        <RotationTimeLine
          rotationSchedule={rotationSchedule}
        ></RotationTimeLine>
      </main>
    </>
  );
};

export default RotationList;

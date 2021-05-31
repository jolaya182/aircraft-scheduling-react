import { Card } from 'react-bootstrap';
const Aircrafts = ({allAircrafts, percentage}) => {
  return (
    <>
        <section  className={"flight-box"}>
          {allAircrafts.map((aircraft, index)=>{
            return (
            <Card key={"Aircrafts-" + index} style={{ width: `${100}%` }}>
              <Card.Body>
                <div key={"aircraft-"+index} className={"airport-col aircraft"}>
                  <div> {aircraft.ident} </div>
                  <div> {"("+percentage+"%)"} </div>
                </div>
              </Card.Body>
            </Card>
            )
          })
        }
          </section>
    </>
  );
};
export default Aircrafts;

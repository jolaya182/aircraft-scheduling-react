const Aircrafts = ({allAircrafts, percentage}) => {
  return (
    <>
      <main>
        <section>Aircrafts</section>
        <section>
          {allAircrafts.map((aircraft, index)=>{
            return (<div key={"aircraft-"+index}>
            <div> {aircraft.ident} </div>
            <div> {"("+percentage+"%)"} </div>
            </div>)

          })}
          </section>
      </main>
    </>
  );
};
export default Aircrafts;

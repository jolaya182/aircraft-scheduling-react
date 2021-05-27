const Paginator = ({setNextDay, setPrevDay}) => {
  return (
    <main>
      <section className="paginator">

      <div onClick={setPrevDay}> {"< "} </div>
      <div>{" Paginator "}</div>
      <div onClick={setNextDay}> {" >"} </div>

      </section>
    </main>
  );
};
export default Paginator;

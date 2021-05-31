/**
 * title: Paginator.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: simple pagination to display the date and navigate through the flights per day
 */
const Paginator = ({setNextDay, setPrevDay, currentDay}) => {

  let currentDate = new Date(2018, 0, (4+currentDay));
  const day = currentDate.toLocaleDateString('en-US', {day:"numeric"}) ;
  const month = currentDate.toLocaleDateString('en-US', {month: 'long'});
  const year = currentDate.toLocaleDateString('en-US', {year: 'numeric'});
  const dayMonthYear= day + " "+month +" "+ year;
  
  return (
    <main>
      <section className="paginator no-select">

      <div onClick={setPrevDay} className={"paginator-arrows"}> {"< "} </div>
      <div>{`${dayMonthYear}`}</div>
      <div onClick={setNextDay} className={"paginator-arrows"}> {" >"} </div>

      </section>
    </main>
  );
};
export default Paginator;

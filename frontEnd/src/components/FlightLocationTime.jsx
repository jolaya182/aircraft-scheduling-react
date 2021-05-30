const FlightLocationTime = ({ location, time, day }) => {
  return (
    <main className={day != 0 ? "flight-location-time" : ""}>
      <div>{location}</div>
      <div>{time}</div>
    </main>
  );
};
export default FlightLocationTime;

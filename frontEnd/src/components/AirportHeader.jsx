const AirportHeader = ({currentAircraft}) => {
  return (
      <div className={"airport-row"}>
        <div className={"airport-col title-left"}>AirCrafts</div>
        <div className={"airport-col title-middle"}>
          Rotation {currentAircraft}
          <div className={"  airport-row flight-box-col  "}>
            <div className={"airport-col title-bottom "}></div>
          </div>
        </div>
        <div className={"airport-col title-right"}>Flights</div>
      </div>
  );
};
export default AirportHeader;

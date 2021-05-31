import { useState, useEffect } from 'react';

const UseAircraftsFromServer = (AIRCRAFTS_SERVER) => {
  const [allAircrafts, setAirCrafts] = useState([{ ident: 'loading' }]);
  const [currentAircraft, setCurrentAircraft] = useState();

  const processIncomingAircraftData = (aircrafts) => {
    const { data } = aircrafts;
    setAirCrafts(data);
    const firstAircraftName = data[0].ident;
    if (data.length > 0) setCurrentAircraft(firstAircraftName);
  };

  const fetchAirCrafts = () => {
    fetch(AIRCRAFTS_SERVER)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        processIncomingAircraftData(json);
      });
  };

  useEffect(() => {
    fetchAirCrafts();
  }, []);
  return { allAircrafts, currentAircraft };
};

export default UseAircraftsFromServer;

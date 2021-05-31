export const FLIGHTS_SERVER = `https://infinite-dawn-93085.herokuapp.com/flights`;
export const AIRCRAFTS_SERVER = `https://infinite-dawn-93085.herokuapp.com/aircrafts`;
export const TOTAL_SECONDS_DAY = 86400;
export const REST_GAP = 1200;
export const REST_GAP_PERCENTAGE = (REST_GAP * 100) / TOTAL_SECONDS_DAY;
export const DEFAULT_SCHEDULE = {
  0: [
    {
      id: 'loading',
      origin: 'loading',
      readable_departure: 'loading',
      destination: 'loading',
      readable_arrival: 'loading'
    }
  ]
};

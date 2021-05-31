import { createContext } from 'react';

const StateContext = createContext({
    state:{
        restGapPercentage:0,
        restGap:0,
        totalSecondsDay:0,
    }
});

export default StateContext;
/**
 * title: StateContext.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: hook that allows to for constant variables to be reached in the application
 */
import { createContext } from 'react';

const StateContext = createContext({
    state:{
        restGapPercentage:0,
        restGap:0,
        totalSecondsDay:0,
    }
});

export default StateContext;
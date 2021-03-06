/**
 * title: RotationTimeBox.jsx
 *
 * date: 5/31/2021
 *
 * author: javier olaya
 *
 * description: the container of location and time for the rotation flight component
 */
import { useContext } from 'react';
import StateContext from './StateContext';

/**
 *
 *
 * @param {integer, string, integer, integer} {
 *   percentageDifference,
 *   color,
 *   idleDistancePercentage,
 *   lastIdlePercentage
 * }
 * @return {Component} 
 */
const RotationTimeBox = ({
  percentageDifference,
  color,
  idleDistancePercentage,
  lastIdlePercentage
}) => {
  const { state } = useContext(StateContext);
  const {restGapPercentage} = state;
  return (
    <>
      <div
        name={'idleDistancePercentage'}
        className={`flight-time-box-base-grey-color  flight-box`}
        style={{ width: `${idleDistancePercentage}%` }}
      ></div>

      <div
        className={`flight-time-box-base-${color}-color flight-box `}
        style={{ width: `${percentageDifference}%` }}
      ></div>

      <div
        className={'flight-time-box-base-purple-color flight-box '}
        style={{ width: `${restGapPercentage}%` }}
      ></div>

      {lastIdlePercentage != false ? (
        <div
          name={'lastIdlePercentage'}
          className={`flight-time-box-base-grey-color  flight-box`}
          style={{ width: `${lastIdlePercentage}%` }}
        ></div>
      ) : (
        ''
      )}
    </>
  );
};
export default RotationTimeBox;

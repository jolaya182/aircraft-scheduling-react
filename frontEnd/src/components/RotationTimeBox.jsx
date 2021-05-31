import { useContext } from 'react';
import StateContext from './StateContext';

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

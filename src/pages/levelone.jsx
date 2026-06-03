import React from 'react';
import "./style.css";
import { useTimer } from 'react-timer-hook';

const LevelOne = () => {
  const time = new Date();
  time.setMinutes(time.getMinutes() + 5); 

  const { minutes, seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('Timer expired!'),
  });

  return (
    <>
      <div className="levelone">
        <div className="timer">
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
        <div className="papermsg">
            <h5>Gather the required items to solve level one</h5>
        </div>
      </div>
    </>
  );
};

export default LevelOne;
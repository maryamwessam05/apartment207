import React, { useState } from 'react';
import "./style.css";
import { useTimer } from 'react-timer-hook';
import clues from "../assets/clues.png";
import menu from "../assets/settings.png";
import MenuOverlay from "./menu";

const LevelOne = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const time = new Date();
  time.setMinutes(time.getMinutes() + 5);

  const { minutes, seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('Timer expired!'),
  });

  return (
    <div className="levelone">
      <audio src="../music/Abdel Halim Hafez - Nebtady Menen ElHekaya  Short version  عبد الحليم حافظ - نبتدى منين الحكاية.mp3"></audio>
      <div className="fixed">
        <div className="timer">
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>

        <div className="icons">
          <img className="clue" src={clues} alt="" />

          <img
            className="menuic"
            src={menu}
            alt=""
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      <div className="papermsg">
        <h5>Gather the required items to solve level one</h5>
      </div>

      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </div>
  );
};

export default LevelOne;
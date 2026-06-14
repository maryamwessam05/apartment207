import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import menu from "../assets/settings.png";
import MenuOverlay2 from './menu2';
import casette from "../assets/casette.png";
import tea from "../assets/tea.png";
import key from "../assets/key.png";
import letter from "../assets/letter.png";
import evileye from "../assets/evileye.png";
import battery from "../assets/battery.png"; // 🔋 add this import
import arrback from "../assets/arrback.png";

const GREY = 'grey';
const BLUE = 'blue';
const YELLOW = 'yellow';

const nextState = (s) => s === GREY ? BLUE : s === BLUE ? YELLOW : GREY;

const checkWin = (grid) =>
  grid.every((row, _ri) =>
    row.every((cell, ci) =>
      ci === 1 ? cell === YELLOW : cell === BLUE
    )
  );

const LevelTwo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [grid, setGrid] = useState(Array(3).fill(null).map(() => Array(3).fill(GREY)));
  const [won, setWon] = useState(false);
  const [batteryCollected, setBatteryCollected] = useState(false);
  const timerAudioRef = useRef(null);
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const navigate = useNavigate();

  const expiryTimestamp = useRef(() => {
    const t = new Date();
    t.setMinutes(t.getMinutes() + 1);
    return t;
  }).current;

  const { minutes, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => navigate(''),
  });

  const isUrgent = minutes === 0 && seconds <= 20;

  useEffect(() => {
    if (isUrgent) {
      timerAudioRef.current?.play();
    } else {
      timerAudioRef.current?.pause();
      if (timerAudioRef.current) timerAudioRef.current.currentTime = 0;
    }
  }, [isUrgent]);

  const handleCircleClick = (ri, ci) => {
    if (won) return;
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => (r === ri && c === ci ? nextState(cell) : cell))
    );
    setGrid(newGrid);
    if (checkWin(newGrid)) setWon(true);
  };

  const handleBatteryCollect = () => {
    setBatteryCollected(true);
  };

  return (
    <>
      <div className="leveltwo">
        <div className="fixed">
          <div className={`timer${isUrgent ? ' timer--urgent' : ''}`}>
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="icons">
            <img className="menuic" src={menu} alt="" onClick={() => setMenuOpen(true)} />
          </div>

          <div className="inventory2">
            <div className="obj"><img className='let1' src={letter} /></div>
            <div className="obj"><img className='eye2' src={evileye} /></div>
            <div className="obj"><img src={tea} /></div>
            <div className="obj"><img src={key} /></div>
            <div className="obj"><img src={casette} /></div>
            {batteryCollected && (
            <div className="obj"><img src={battery} className="battery-inv" /></div>
            )}
          </div>
        </div>

        <MenuOverlay2 isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="puzzle1select" onClick={() => setPuzzleOpen(true)}></div>
        <div className={`puzzle1${puzzleOpen ? ' puzzle1--open' : ''}`}>
            <img src={arrback} alt="" className='arrback' onClick={() => setPuzzleOpen(false)} />
          <div className="circles">
            {grid.map((row, ri) => (
              <div className="circrow" key={ri}>
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`circle circle--${cell}`}
                    onClick={() => handleCircleClick(ri, ci)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {won && !batteryCollected && (
          <div className="battery-reveal" onClick={handleBatteryCollect}>
            <img src={battery} alt="battery" className="battery-img" />
          </div>
        )}

        <div className="puzzle2select"></div>
      </div>
    </>
  );
};

export default LevelTwo;
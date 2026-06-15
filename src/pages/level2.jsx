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
import battery from "../assets/battery.png"; 
import arrback from "../assets/arrback.png";
import blueye from "../assets/blueeye.png";
import puz3clue from "../assets/puz2clue.svg";
import puz1solved from "../assets/puz1solved.png";
import puz2solved from "../assets/puz2solved.png";
import frontbtn from "../assets/btno.svg";
import backbtn from "../assets/btnw.svg";
import cascircle from "../assets/cascircle.png";
import time from "../assets/time.svg";
import linered from "../assets/linered.svg";
import casclosed from "../assets/casclosed.png";
import casetteSfx from "../music/casette.mp3";
import radioSfx from "../music/radio.mp3";

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

const TAPE_STEPS = [
  { pos: 3.7,  msg: '......' },
  { pos: 13.4, msg: '...nothing was wrong\u2026' },
  { pos: 24.0, msg: '......' },
  { pos: 33.8, msg: '......' },
  { pos: 44, msg: 'why does he look different?' },
  { pos: 54.0, msg: '......' },
  { pos: 64.3, msg: '......' },
  { pos: 74.5, msg: '...you imagined it\u2026' },
  { pos: 84.5, msg: '......' },
];
const GLOW_INDEX = 4;

const LevelTwo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [grid, setGrid] = useState(Array(3).fill(null).map(() => Array(3).fill(GREY)));
  const [won, setWon] = useState(false);
  const [batteryCollected, setBatteryCollected] = useState(false);
  const [batteryUsed, setBatteryUsed] = useState(false);
  const [casOpen, setCasOpen] = useState(false);
  const [cassetteInInventory, setCassetteInInventory] = useState(true);
  const [tapeIndex, setTapeIndex] = useState(0);
  const [tapeMoved, setTapeMoved] = useState(false);
  const [circleRotation, setCircleRotation] = useState(0);
  const timerAudioRef = useRef(null);
  const casetteAudioRef = useRef(null);
  const radioAudioRef = useRef(null);
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const [clueOpen, setClueOpen] = useState(false);
  const [puz2Open, setPuz2Open] = useState(false);
  const [puz3Open, setPuz3Open] = useState(false);
  const [puz4Open, setPuz4Open] = useState(false);
  const [eyeUsed, setEyeUsed] = useState(false);
  const [puzzle1Solved, setPuzzle1Solved] = useState(false);
  const [puzzle2Solved, setPuzzle2Solved] = useState(false);
  const LETTERS = ['A', 'K', 'E', 'D'];
  const nextLetter = (l) => LETTERS[(LETTERS.indexOf(l) + 1) % LETTERS.length];
  const WIN_COMBO = ['A', 'E', 'K', 'D'];
  const [letterCombo, setLetterCombo] = useState(['A', 'A', 'A', 'A']);
  const [puzzle3Solved, setPuzzle3Solved] = useState(false);
  const [comboWon, setComboWon] = useState(false);
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

  const currentStep = TAPE_STEPS[tapeIndex];
  const linePos = currentStep.pos;
  const tapeMessage = !casOpen
    ? '.....'
    : !tapeMoved
    ? 'Spin the button to decode'
    : currentStep.msg;
  const isGlow = casOpen && tapeIndex === GLOW_INDEX;
  const isDots = tapeMessage === '......';

  useEffect(() => {
    if (!radioAudioRef.current) return;
    if (casOpen && tapeMoved && isDots) {
      radioAudioRef.current.currentTime = 0;
      radioAudioRef.current.play();
    } else {
      radioAudioRef.current.pause();
      radioAudioRef.current.currentTime = 0;
    }
  }, [isDots, casOpen, tapeMoved]);

  const casMessage = !batteryUsed
    ? 'Casette is off'
    : !casOpen
    ? 'Casette is on'
    : 'Spin the button to decode';

  const handleCircleClick = (ri, ci) => {
    if (won) return;
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => (r === ri && c === ci ? nextState(cell) : cell))
    );
    setGrid(newGrid);
    if (checkWin(newGrid)) setWon(true);
  };

  const handleBatteryCollect = () => setBatteryCollected(true);

  const handleLetterClick = (i) => {
    if (comboWon) return;
    const next = letterCombo.map((l, idx) => idx === i ? nextLetter(l) : l);
    setLetterCombo(next);
    if (next.join('') === WIN_COMBO.join('')) setComboWon(true);
  };

  
  const handleBatteryInventoryClick = () => {
    if (batteryCollected && !batteryUsed) {
      setBatteryUsed(true);
    }
  };

  const handleCassetteInventoryClick = () => {
    if (batteryUsed && !casOpen) {
      casetteAudioRef.current?.play();
      setCassetteInInventory(false);
      // small delay so puzzle4 is already open before bg switches — prevents flash
      setPuz4Open(true);
      setTimeout(() => setCasOpen(true), 50);
    }
  };

  const handleFront = () => {
    setTapeMoved(true);
    setTapeIndex(prev => Math.min(prev + 1, TAPE_STEPS.length - 1));
    setCircleRotation(prev => prev + 20);
  };

  const handleBack = () => {
    setTapeMoved(true);
    setTapeIndex(prev => Math.max(prev - 1, 0));
    setCircleRotation(prev => prev - 20);
  };

  return (
    <>
      {/* Audio elements */}
      <audio ref={timerAudioRef} src="/assets/music/timer.mp3" loop />
      <audio ref={casetteAudioRef} src={casetteSfx} />
      <audio ref={radioAudioRef} src={radioSfx} loop />

      <div className="leveltwo" style={
        puzzle3Solved ? { backgroundImage: `url(${puz2solved})` } :
        puzzle2Solved ? { backgroundImage: `url(${puz2solved})` } :
        puzzle1Solved ? { backgroundImage: `url(${puz1solved})` } : {}
      }>
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
            <div className="obj" style={eyeUsed ? { display: 'none' } : {}}>
              <img className='eye2' src={evileye} onClick={() => { if (puz2Open) setEyeUsed(true); }} />
            </div>
            <div className="obj"><img src={tea} /></div>
            <div className="obj"><img src={key} /></div>

            {/* Cassette — hidden once inserted */}
            {cassetteInInventory && (
              <div
                className="obj"
                onClick={handleCassetteInventoryClick}
                style={batteryUsed && !casOpen ? { cursor: 'pointer' } : {}}
              >
                <img src={casette} />
              </div>
            )}

            {/* Battery — hidden once used to power cassette */}
            {batteryCollected && !batteryUsed && (
              <div className="obj" onClick={handleBatteryInventoryClick} style={{ cursor: 'pointer' }}>
                <img src={battery} className="battery-inv" />
              </div>
            )}
          </div>
        </div>

        <MenuOverlay2 isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="puzzle1select" onClick={() => setPuzzleOpen(true)}></div>
        <div className={`puzzle1${puzzleOpen ? ' puzzle1--open' : ''}`}>
          <img src={arrback} alt="" className='arrback' onClick={() => {
            setPuzzleOpen(false);
            if (won) setPuzzle1Solved(true);
          }} />
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

        <div className="puzzle1clueselect" onClick={() => setClueOpen(true)}></div>
        <div className={`puzzle1clue${clueOpen ? ' puzzle1clue--open' : ''}`}>
          <img src={arrback} alt="" className='arrback' onClick={() => setClueOpen(false)} />
        </div>

        <div className="puzzle2select" onClick={() => setPuz2Open(true)}></div>
        <div className={`puzzle2${puz2Open ? ' puzzle2--open' : ''}`}>
          <img src={arrback} alt="" className='arrback' onClick={() => {
            setPuz2Open(false);
            if (eyeUsed) setPuzzle2Solved(true);
          }} />
          <img src={blueye} alt="" className='blueye' style={eyeUsed ? { opacity: 1 } : {}} />
          <img className={`puz3clue${eyeUsed ? ' puz3clue--visible' : ''}`} src={puz3clue} alt="" />
        </div>

        <div className="puzzle3select" onClick={() => setPuz3Open(true)}></div>
        <div className={`puzzle3${puz3Open ? ' puzzle3--open' : ''}`}>
          <img src={arrback} alt="" className='arrback' onClick={() => {
            setPuz3Open(false);
            if (comboWon) setPuzzle3Solved(true);
          }} />
          <div className="letframes">
            {letterCombo.map((letter, i) => (
              <div
                key={i}
                className={`letterframe${comboWon ? ' letterframe--won' : ''}`}
                onClick={() => handleLetterClick(i)}
              >
                {letter}
              </div>
            ))}
          </div>
          {comboWon && <p className="combo-msg">Fit in the missing piece</p>}
        </div>

        {/* Puzzle 4 — cassette player */}
        <div className="puzzle4select" onClick={() => setPuz4Open(true)}></div>
        <div
          className={`puzzle4${puz4Open ? ' puzzle4--open' : ''}`}
          style={casOpen ? { backgroundImage: `url(${casclosed})` } : {}}
        >
          <img src={arrback} alt="" className='arrback' onClick={() => setPuz4Open(false)} />

          <div className="messagecas">{casMessage}</div>

          <div
            className="power"
            style={batteryUsed ? { background: '#e84040', boxShadow: '0 0 8px #e84040' } : {}}
          />

          <div className="casigncont">
            <div className={`casign${isGlow ? ' casign--glow' : ''}`}>
              <img className='time' src={time} alt="" />
              <h2>{tapeMessage}</h2>
            </div>
            <img
              src={linered}
              alt=""
              className='linered'
              style={{ left: `${linePos}%` }}
            />
          </div>

          <img
            src={cascircle}
            className='cascircle'
            alt=""
            style={{ transform: `rotate(${circleRotation}deg)`, transition: 'transform 0.3s ease' }}
          />

          <div className="casbuttons" style={casOpen ? { display: 'inline-flex' } : {}}>
            <img src={backbtn} alt="back" onClick={handleBack} style={{ cursor: 'pointer' }} />
            <img src={frontbtn} alt="forward" onClick={handleFront} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelTwo;
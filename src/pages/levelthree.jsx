import React, { useState, useEffect, useRef } from 'react';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import menu from "../assets/settings.png";
import teapot from "../assets/teapot.png"
import salt from "../assets/salt.png"
import mitten from "../assets/mitten.png"
import cup from "../assets/cup.png"
import whisk from "../assets/whisk.png"
import lemon from "../assets/lemon.png"
import board from "../assets/board.png"
import spoon from "../assets/spoon.png"
import ding from "../music/ding.mp3"
import arrback from "../assets/arrback.png";
import MenuOverlay2 from './menu2';
import arrow from "../assets/arrow.svg"
import Button from '../components/button';

const INVENTORY_ORDER = ['teapot', 'salt', 'mitten', 'cup', 'whisk', 'lemon', 'board', 'spoon'];

const OBJECTS = {
    teapot: { src: teapot, invClassName: 'inv-teapot', roomClassName: 'room-teapot', title: 'Teapot' },
    salt:   { src: salt,   invClassName: 'inv-salt',   roomClassName: 'room-salt',   title: 'Salt' },
    mitten: { src: mitten, invClassName: 'inv-mitten', roomClassName: 'room-mitten', title: 'Mitten' },
    cup:    { src: cup,    invClassName: 'inv-cup',    roomClassName: 'room-cup',    title: 'Cup' },
    whisk:  { src: whisk,  invClassName: 'inv-whisk',  roomClassName: 'room-whisk',  title: 'Whisk' },
    lemon:  { src: lemon,  invClassName: 'inv-lemon',  roomClassName: 'room-lemon',  title: 'Lemon' },
    board:  { src: board,  invClassName: 'inv-board',  roomClassName: 'room-board',  title: 'Board' },
    spoon:  { src: spoon,  invClassName: 'inv-spoon',  roomClassName: 'room-spoon',  title: 'Spoon' },
};

const LevelThree = () => {
    const [menuOpen, setMenuOpen]   = useState(false);
    const [clue1Open, setClue1Open] = useState(false);
    const [puzzle1Open2, setpuzzle1Open2] = useState(false);
    const [clue2Open, setclue2Open] = useState(false);
    const [finalPuzzle, setfinalPuzzle] = useState(false);
    const [foundObjects, setFoundObjects] = useState(new Set());
    const [arrowAngles, setArrowAngles] = useState([0, 0, 0, 0]);
    const [puzzleSolved, setPuzzleSolved] = useState(false);
      const [numCombo, setNumCombo] = useState([0, 0, 0, 0]);  
    const [numGlow, setNumGlow] = useState(false);
    const WIN_NUM = [0, 3, 6, 9];
    const WINNING_COMBO = [0, 90, 180, 180];
    const ANGLE_STEPS = [0, -90, 180, 90];
    const timerAudioRef = useRef(null);
    const dingRef       = useRef(null);
    const navigate      = useNavigate();

    const expiryTimestamp = useRef(() => {
        const t = new Date();
        t.setMinutes(t.getMinutes() + 50);
        return t;
    }).current;

    const { minutes, seconds } = useTimer({
        expiryTimestamp,
        onExpire: () => navigate('/lose'),
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

    const handleObjectClick = (id) => {
        if (foundObjects.has(id)) return;

        if (dingRef.current) {
            dingRef.current.currentTime = 0;
            dingRef.current.play();
        }

        setFoundObjects(prev => new Set([...prev, id]));
    };

    const handleArrowClick = (index) => {
    setArrowAngles(prev => {
        const newAngles = [...prev];
        const currentStep = ANGLE_STEPS.indexOf(newAngles[index]);
        const nextStep = (currentStep + 1) % ANGLE_STEPS.length;
        newAngles[index] = ANGLE_STEPS[nextStep];

        const isWin = newAngles.every((angle, i) => angle === WINNING_COMBO[i]);
        if (isWin) setPuzzleSolved(true);

        return newAngles;
    });
};

 

      const handleNumClick = (i) => {
  if (numGlow) return;
  setNumCombo(prev => prev.map((n, idx) => idx === i ? (n + 1) % 10 : n));
};

const handleNumCheck = () => {
  if (numCombo.join('') === WIN_NUM.join('')) {
    setNumGlow(true);
    setTimeout(() => navigate('/level4'), 1200);
  }
};

    return (
        <>
            <audio ref={dingRef} src={ding} />

            <div className="level3">

              
                <div className="fixed">
                    <div className={`timer${isUrgent ? ' timer--urgent' : ''}`}>
                        {String(minutes).padStart(2, '0')}:
                        {String(seconds).padStart(2, '0')}
                    </div>
                    <div className="icons">
                        <img className="menuic" src={menu} alt="" onClick={() => setMenuOpen(true)} />
                    </div>
                </div>

        
                <div className="papermsg">
                    <h5>Find all the hidden objects in the room</h5>
                </div>


                <div className="invent2">
                    {INVENTORY_ORDER.map((id) => {
                        const obj = OBJECTS[id];
                        return (
                            <div className="obj" key={id}>
                                <img
                                    src={obj.src}
                                    className={obj.invClassName}
                                    alt={obj.title}
                                    style={{ opacity: foundObjects.has(id) ? 1 : 0.3 }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="room-objects">
                    {INVENTORY_ORDER.map((id) => {
                        const obj = OBJECTS[id];
                        if (foundObjects.has(id)) return null;
                        return (
                            <img
                                key={id}
                                src={obj.src}
                                alt={obj.title}
                                className={`room-object ${obj.roomClassName}`}
                                onClick={() => handleObjectClick(id)}
                            />
                        );
                    })}
                </div>

                <div
                    className="puzzleroom1clueselect"
                    onClick={() => setClue1Open(true)}
                />

                <div className={`puzzle1room2clue${clue1Open ? ' puzzle1room2clue--open' : ''}`}>
                    <img
                        src={arrback}
                        alt=""
                        className="arrback"
                        onClick={() => setClue1Open(false)}
                    />
                </div>
                
                <div className="puzzle1room2select" onClick={() => setpuzzle1Open2(true)}></div>
                <div className={`puzzle1room2${puzzle1Open2 ? ' puzzle1room2--open' : ''}`}>
                    <img
                        src={arrback}
                        alt=""
                        className="arrback"
                        onClick={() => setpuzzle1Open2(false)}
                    />
                    <div className="blocks">
                        {arrowAngles.map((angle, index) => (
                            <div
                                className="arrow"
                                key={index}
                                onClick={() => handleArrowClick(index)}
                            >
                                <img
                                    src={arrow}
                                    alt=""
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {puzzleSolved && (
                        <div className="combo-msg">CORRECT!</div>
                    )}
                </div>

                <div className="codeclue2select" onClick={() => setclue2Open(true)}></div>
                <div className={`codeclue2${clue2Open ? ' codeclue2--open' : ''}`}>
                     <img
                        src={arrback}
                        alt=""
                        className="arrback"
                        onClick={() => setclue2Open(false)}
                    />
                </div>

                <div className="finalpuzzleselect"  onClick={() => setfinalPuzzle(true)}></div>
                <div className={`finalpuzzle${finalPuzzle ? ' finalpuzzle--open' : ''}`}>
                    <img
                        src={arrback}
                        alt=""
                        className="arrback"
                        onClick={() => setfinalPuzzle(false)}
                    />
                    <div className="pas">
                        <div className="password">
                        {numCombo.map((num, i) => (
                        <div
                            key={i}
                            className={`numbtn${numGlow ? ' numbtn--glow' : ''}`}
                            onClick={() => handleNumClick(i)}
                        >
                            {num}
                        </div>
                        ))}
                    </div>
                    <Button text="CHECK" onClick={handleNumCheck} />

                    </div>
                </div>
                <MenuOverlay2 isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            </div>
        </>
    );
};

export default LevelThree;
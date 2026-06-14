import React, { useState, useEffect, useRef } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import menu from "../assets/settings.png";
import MenuOverlay from "./menu";
import videoSrc from "../assets/0607.mp4";
import casette from "../assets/casette.png";
import tea from "../assets/tea.png";
import key from "../assets/key.png";
import letter from "../assets/letter.png";
import evileye from "../assets/evileye.png";
import letterOverlay from "../assets/letteroverlay.png";
import keyOverlay from "../assets/keyoverlay.png";
import teaOverlay from "../assets/teaoverlay.png";
import evileyeOverlay from "../assets/evileyeoverlay.png";
import casetteOverlay from "../assets/casetteoverlay.png";
import timerSfx from "../music/timer.mp3";
import ObjectOverlay from "./objectoverlay";
import MenuOverlay2 from './menu2';

export const OBJECTS = {
  letter: {
    id: 'letter',
    title: 'Letter',
    description: 'contains a hidden message',
    image: letterOverlay,
    src: letter,
    className: 'letterroom',
    invClassName: 'invenobj1',
  },
  evileye: {
    id: 'evileye',
    title: 'Evil Eye',
    description: '',
    image: evileyeOverlay,
    src: evileye,
    className: 'evileyeroom',
    invClassName: 'invenobj2',
  },
  tea: {
    id: 'tea',
    title: 'Tea',
    description: '',
    image: teaOverlay,
    src: tea,
    className: 'tearoom',
    invClassName: 'invenobj',
  },
  key: {
    id: 'key',
    title: 'Key',
    description: 'opens a certain safe',
    image: keyOverlay,
    src: key,
    className: 'keyroom',
    invClassName: 'invenobj',
  },
  casette: {
    id: 'casette',
    title: 'Casette',
    description: 'decipher a code',
    image: casetteOverlay,
    src: casette,
    className: 'casetteroom',
    invClassName: 'invenobj',
  },
};

export const INVENTORY_ORDER = ['letter', 'evileye', 'tea', 'key', 'casette'];

const LevelOne = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [foundObjects, setFoundObjects] = useState(new Set());
  const timerAudioRef = useRef(null);
  const navigate = useNavigate();

  const expiryTimestamp = useRef(() => {
    const t = new Date();
    t.setMinutes(t.getMinutes() + 1);
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
    setActiveOverlay(id);
    setOverlayVisible(true);
  };

  const handleAddToInventory = () => {
    setOverlayVisible(false);
    setTimeout(() => {
      setFoundObjects(prev => new Set([...prev, activeOverlay]));
      setActiveOverlay(null);
    }, 500);
  };

  useEffect(() => {
    if (foundObjects.size === INVENTORY_ORDER.length) {
      setTimeout(() => navigate('/win'), 600);
    }
  }, [foundObjects]);

  return (
    <div className="levelone">
      <video className="levelvideo" src={videoSrc} autoPlay loop muted />
      <audio ref={timerAudioRef} src={timerSfx} loop />

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
        <h5>Gather the required items to solve level one</h5>
      </div>

      <div className="inventory">
        {INVENTORY_ORDER.map((id) => {
          const obj = OBJECTS[id];
          return (
            <div className="obj" key={id}>
              <img
                src={obj.src}
                className={obj.invClassName}
                alt={obj.title}
                style={{ opacity: foundObjects.has(id) ? 1 : 0.5 }}
              />
            </div>
          );
        })}
      </div>

      {Object.values(OBJECTS).map((obj) =>
        !foundObjects.has(obj.id) ? (
          <img
            key={obj.id}
            className={obj.className}
            src={obj.src}
            alt={obj.title}
            onClick={() => handleObjectClick(obj.id)}
            style={{ cursor: 'pointer' }}
          />
        ) : null
      )}

      {activeOverlay && (
        <ObjectOverlay
          title={OBJECTS[activeOverlay].title}
          description={OBJECTS[activeOverlay].description}
          image={OBJECTS[activeOverlay].image}
          isVisible={overlayVisible}
          onAddToInventory={handleAddToInventory}
        />
      )}

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default LevelOne;
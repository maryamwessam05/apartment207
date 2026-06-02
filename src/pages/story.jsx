import React, { useState, useRef } from 'react';
import "./style.css";
import envelope from "../assets/envelope.png";
import baba from "../assets/baba.svg";
import letterVoice from "../music/letter voice over.mp3";
import Button from '../components/button';
import { Link } from 'react-router-dom';

const Story = () => {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="story">
      <audio ref={audioRef} src={letterVoice} />

      <h1>Why are you here?</h1>

      <div
        className={`env ${opened ? "opened" : ""}`}
        onClick={handleOpen}
      >
        <svg width="0" height="0">
          <defs>
            <clipPath id="letterClip" clipPathUnits="objectBoundingBox">
              <path d="M0.984 0.769L1 0.765L0.995 0L0 0L0 0.765L0.345 1L0.653 1L0.984 0.769Z" />
            </clipPath>
          </defs>
        </svg>

        <img className="envelope" src={envelope} alt="Envelope" />

        <div className="lettermask">
          <div className="letter">
            <p>I didn’t think you’d come back here…

            The home is still the same. Nothing changed.

            Maybe you thought you left this behind… but some things don’t stay buried.

            Everything you need is already here- Look closely.

            Piece it together.
            Follow what you find.
            Start from the beginning.

            Only then will you understand why you’re here…
            and what really happened.

            And don’t trust everything you remember.</p>
            <img src={baba} alt="baba" />
          </div>
        </div>
      </div>
    <div className="lvl1btn">
      <Link to="/levelone">
      <Button text="Start Lvl 1" />
      </Link>

    </div>
      
    </div>
  );
};

export default Story;
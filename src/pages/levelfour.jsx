import React, { useState, useEffect, useRef } from 'react';
import "./style.css"
import menu from "../assets/settings.png";
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import MenuOverlay2 from './menu2';
import key from "../assets/key.png";
import letter from "../assets/letter.png";
import arrback from "../assets/arrback.png";
import missing from "../assets/missing.png"
import bagOpen from "../assets/bagopen.png"
import framedone from "../assets/framedone.png"

const Level4 = () => {
    const timerAudioRef = useRef(null);
    const dingRef       = useRef(null);
    const navigate      = useNavigate();

    const [menuOpen, setMenuOpen]   = useState(false);
    const [bagOpen2, setBagOpen2]   = useState(false);
    const [frameOpen, setFrameOpen] = useState(false);
    const [keyUsed, setKeyUsed]           = useState(false); // key removed from invenver after use
    const [bagUnlocked, setBagUnlocked]   = useState(false); // bag bg changed to bagopen.png
    const [missingInBag, setMissingInBag] = useState(true);  // missing poster visible in bag
    const [missingInInven, setMissingInInven] = useState(false); // missing added to invenver
    const [frameSolved, setFrameSolved]   = useState(false); // frame bg changed to framedone.png
    const [showRevealMsg, setShowRevealMsg] = useState(false); // final message

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

    const handleKeyClick = () => {
        if (bagOpen2 && !bagUnlocked) {
            setBagUnlocked(true);
            setKeyUsed(true);
        }
    };

    const handleMissingClick = () => {
        if (bagUnlocked && missingInBag) {
            setMissingInBag(false);
            setMissingInInven(true);
        }
    };

    const handleMissingInvenClick = () => {
        if (frameOpen && missingInInven && !frameSolved) {
            setFrameSolved(true);
            setMissingInInven(false);
            setShowRevealMsg(true);
            setTimeout(() => navigate('/win3'), 10000);
        }
    };

    return (
        <>
        <div className="level4">
            <div className="fixed">
                <div className={`timer${isUrgent ? ' timer--urgent' : ''}`}>
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                </div>
                <div className="icons">
                    <img className="menuic" src={menu} alt="" onClick={() => setMenuOpen(true)} />
                </div>
            </div>

            <div className="invenver">
                {!keyUsed && (
                    <div className="obj" onClick={handleKeyClick} style={{ cursor: bagOpen2 ? 'pointer' : 'default' }}>
                        <img src={key} alt="key" />
                    </div>
                )}

                <div className="obj">
                    <img className='letin' src={letter} alt="letter" />
                </div>

                {missingInInven && (
                    <div
                        className="obj"
                        onClick={handleMissingInvenClick}
                        style={{ cursor: frameOpen ? 'pointer' : 'default' }}
                    >
                        <img
                            src={missing}
                            alt="missing"
                            style={{ transform: 'scale(0.1)', transformOrigin: 'center' }}
                        />
                    </div>
                )}
            </div>

            <div className="bagselect" onClick={() => setBagOpen2(true)}></div>

            <div
                className={`bag${bagOpen2 ? ' bag--open' : ''}`}
                style={bagUnlocked ? { backgroundImage: `url(${bagOpen})` } : {}}
            >
                <img src={arrback} alt="" className='arrback' onClick={() => setBagOpen2(false)} />

                <img
                    src={missing}
                    alt="missing poster"
                    className='missing'
                    style={{
                        opacity: bagUnlocked && missingInBag ? 1 : 0,
                        cursor: bagUnlocked && missingInBag ? 'pointer' : 'default',
                        pointerEvents: bagUnlocked && missingInBag ? 'auto' : 'none',
                    }}
                    onClick={handleMissingClick}
                />
            </div>

            <div className="frameselect" onClick={() => setFrameOpen(true)}></div>

            <div
                className={`frame${frameOpen ? ' frame--open' : ''}`}
                style={frameSolved ? { backgroundImage: `url(${framedone})` } : {}}
            >
                <img src={arrback} alt="" className='arrback' onClick={() => setFrameOpen(false)} />

                {showRevealMsg && (
                    <div className="messagecas2">
                        Who you thought was your dad is your uncle — he killed me and took my place in your life
                    </div>
                )}
            </div>

            <MenuOverlay2 isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
        </>
    );
}

export default Level4;
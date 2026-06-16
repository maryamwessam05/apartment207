import React, { useState, useEffect, useRef } from 'react';
import "./style.css"
import menu from "../assets/settings.png";
import { default as useTimer } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';
import MenuOverlay2 from './menu2';


const Level4 = () => {
        const timerAudioRef = useRef(null);
    const dingRef       = useRef(null);
    const navigate      = useNavigate();
        const [menuOpen, setMenuOpen]   = useState(false);
    
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

                <MenuOverlay2 isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        </div>
        </>
     );
}
 
export default Level4;
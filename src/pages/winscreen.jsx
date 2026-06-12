import React, { useEffect, useRef, useState } from 'react';
import "./style.css"
import winframe from "../assets/winframe.png"
import Button from '../components/button';
import { Link } from 'react-router-dom';
import tablaSrc from "../music/tabla.mp3";

const WinScreen = (props) => {
    const [visible, setVisible] = useState(false);
    const tablaRef = useRef(null);

    useEffect(() => {
        // trigger slide-in on mount
        requestAnimationFrame(() => setVisible(true));

        // play tabla
        if (tablaRef.current) {
            tablaRef.current.currentTime = 0;
            tablaRef.current.play().catch(() => {});
        }
    }, []);

    return (
        <div className={`winscreen ${visible ? 'winscreen-visible' : ''}`}>
            <audio ref={tablaRef} src={tablaSrc} preload="auto" />
            <div className="winframe">
                <img src={winframe} className='winframepic' alt="" />
                <div className="wincont">
                    <div className="wintext">
                        <h4>CONGRATS YOU PASSED</h4>
                        <h1>LEVEL ONE {props.level}</h1>
                    </div>
                    <div className="winbtns">
                        <Link to={"/clues"}>
                            <Button text="View Clues" />
                        </Link>
                        <Link to={"/levels2"}>
                            <Button text="Next Level" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WinScreen;
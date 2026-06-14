import React from 'react';
import "./style.css";
import menulogo from "../assets/menulogo.svg";
import Button from '../components/button';
import music from "../assets/music.png";
import { Link } from "react-router-dom";
import { useMusic } from './musicprovider';

const MenuOverlay2 = ({ isOpen, onClose }) => {
    const { playing, toggle, sfxOn, toggleSfx } = useMusic();

    return (
        <div className={`menuOverlay ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="menu" onClick={(e) => {e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}}>
                <div className="menucont">
                    <img src={menulogo} alt="Menu Logo" />

                    <div className="menubtns">
                        <div onClick={onClose}>
                            <Button text="Resume" />
                        </div>
                        <Link to="/leveltwo">
                            <Button text="Restart" />
                        </Link>
                        <Link to="/levels2">
                            <Button text="Exit" />
                        </Link>
                    </div>

                    <div className="soundbtns">
                        <div className="mu">
                            <h4>Music</h4>
                            <img src={music} alt="" />
                            <div className="bar">
                                <span>{playing ? "on" : "off"}</span>
                                <div className="barac" onClick={toggle}>
                                    <div className={`square ${playing ? "active" : ""}`}></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mu">
                            <h4>SFX</h4>
                            <img src={music} alt="" />
                            <div className="bar">
                                <span>{sfxOn ? "on" : "off"}</span>
                                <div className="barac" onClick={toggleSfx}>
                                    <div className={`square ${sfxOn ? "active" : ""}`}></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay2;
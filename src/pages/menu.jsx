import React from 'react';
import "./style.css";
import menulogo from "../assets/menulogo.svg";
import Button from '../components/button';
import music from "../assets/music.png";
import { Link } from "react-router-dom";
import { useMusic } from '../pages/musicprovider';

const MenuOverlay = ({ isOpen, onClose }) => {
    const { playing, toggle, sfxOn, toggleSfx } = useMusic();

    return (
        <div className={`menuOverlay ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="menu" onClick={(e) => e.stopPropagation()}>
                <div className="menucont">
                    <img src={menulogo} alt="Menu Logo" />

                    <div className="menubtns">
                        <div onClick={onClose}>
                            <Button text="Resume" />
                        </div>
                        <Link to="/story">
                            <Button text="Restart" />
                        </Link>
                        <Link to="/levels">
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

export default MenuOverlay;
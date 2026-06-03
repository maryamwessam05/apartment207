import React , {useState} from 'react';
import "./style.css";
import menulogo from "../assets/menulogo.svg";
import Button from '../components/button';
import music from "../assets/music.png"
import {Link} from "react-router-dom";

const MenuOverlay = () => {
      const [musicOn, setMusicOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
    return ( 
        <>
        <div className="menu">
            <div className="menucont">
                <img src={menulogo} alt="Menu Logo" />

                <div className="menubtns">
                    
                    <Link to="/levelone">
                        <Button text="Resume" />
                    </Link>
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
                    <span>{musicOn ? "on" : "off"}</span>

                    <div
                        className="barac"
                        onClick={() => setMusicOn(!musicOn)}
                    >
                        <div className={`square ${musicOn ? "active" : ""}`}></div>
                        <div className="line"></div>
                    </div>
                    </div>
                </div>

                <div className="mu">
                    <h4>SFX</h4>
                  <img src={music} alt="" />

                    <div className="bar">
                    <span>{sfxOn ? "on" : "off"}</span>

                    <div
                        className="barac"
                        onClick={() => setSfxOn(!sfxOn)}
                    >
                        <div className={`square ${sfxOn ? "active" : ""}`}></div>
                        <div className="line"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
        
        </>
     );
}
 
export default MenuOverlay;
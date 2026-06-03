import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import "./style.css"
import levelframe from "../assets/levelframe.png"
import { Link } from 'react-router-dom';
import level1 from "../assets/1.png";
import level2 from "../assets/2lock.png";
import level3 from "../assets/3lock.png";

const Levels = () => {
    const yellowRef = useRef(null);

    useEffect(() => {
        gsap.to(yellowRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, []);

    return ( 
        <>
        <div className="levels">
            <audio autoPlay src="../music/Abdel Halim Hafez - Nebtady Menen ElHekaya  Short version  عبد الحليم حافظ - نبتدى منين الحكاية.mp3"></audio>
            <div ref={yellowRef} className="yellow"></div>
             <div className="candle candle-left"></div>
            <div className="candle candle-right"></div>
            <img className="levelframe" src={levelframe} alt="Level Frame" />
            <h2 className='leveltitle'>LEVELS</h2>
            <div className="levelcont">
                <Link to={"/story"}>
  <div className="lev">
    <img src={level1} alt="" className="levimg" />

    <div className="levname">
      THE MESS
    </div>
  </div>
                </Link>

                <div className="lev2">
                <img src={level2} alt="" className="levimg" />

                <div className="levname">
                    What You Hid
                </div>
                </div>

                <div className="lev3">
                <img src={level3} alt="" className="levimg" />

                <div className="levname">
                    THE TRUTH
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Levels;
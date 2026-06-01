import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import "./style.css"
import levelframe from "../assets/levelframe.png"
import { Link } from 'react-router-dom';

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
            <img className="levelframe" src={levelframe} alt="Level Frame" />
            <h2 className='leveltitle'>LEVELS</h2>
            <div className="levelcont">
                <Link to={"/story"}>
                    <div className="lev">
                        <div className="levname">
                            THE MESS
                        </div>
                    </div>
                
                </Link>
                <div className="lev2">
                    <div className="levname">
                        What You Hid
                    </div>
                </div>
                <div className="lev3">
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
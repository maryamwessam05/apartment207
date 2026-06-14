import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import levelframe from "../assets/levelframe.png"
import level1 from "../assets/1.png";
import level2 from "../assets/2lock.png";
import level3 from "../assets/3lock.png";
import swish from "../music/swish.mp3";

const Levels = () => {
    const yellowRef = useRef(null);
    const lev1Ref = useRef(null);
    const levelsPageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.to(yellowRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    }, []);

    const handleLevel1Click = (e) => {
    e.preventDefault();

    const audio = new Audio(swish);
    audio.play();

    const rect = lev1Ref.current.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const tl = gsap.timeline({
        onComplete: () => navigate("/story")
    });

    tl.to(lev1Ref.current, {
        scale: 1.15,
        duration: 0.15,
        ease: 'power2.out'
    })
    .to(levelsPageRef.current, {
        scale: 3,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.in',
        transformOrigin: `${originX}px ${originY}px`
    });
};
    return ( 
        <>
        <div className="levels" ref={levelsPageRef}>
            <div ref={yellowRef} className="yellow"></div>
            <div className="candle candle-left"></div>
            <div className="candle candle-right"></div>
            <img className="levelframe" src={levelframe} alt="Level Frame" />
            <h2 className='leveltitle'>LEVELS</h2>
            <div className="levelcont">

                <a href="/story" onClick={handleLevel1Click}>
                    <div className="lev" ref={lev1Ref}>
                        <img src={level1} alt="" className="levimg" />
                        <div className="levname">THE MESS</div>
                    </div>
                </a>
                <a href="/leveltwo" onClick={handleLevel1Click}>
                    <div className="lev2">
                        <img src={level2} alt="" className="levimg" />
                        <div className="levname">What You Hid</div>
                    </div>
                </a>

                <div className="lev3">
                    <img src={level3} alt="" className="levimg" />
                    <div className="levname">THE TRUTH</div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Levels;
import React, { useRef } from 'react';
import "./style.css"
import background from "../assets/home.jpg"
import TextType from '../components/TextType';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import DustParticles from '../components/dust';

const Splash = () => {
    const navigate = useNavigate();
    const backRef = useRef(null);
    const yellowRef = useRef(null);

    const handleStart = () => {
    const tl = gsap.timeline({
        onComplete: () => navigate('/levels')
    });

    tl.to(backRef.current, {
        scale: 2,
        transformOrigin: 'bottom center',
        duration: 0.8,
        ease: 'power2.in'
    })
    .to(yellowRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.in'
    });
};



    return (
        <>
        <main>
            <DustParticles style={{ position: "absolute", inset: 0 , zIndex: 100 }} />
            <audio autoPlay src="../music/Abdel Halim Hafez - Nebtady Menen ElHekaya  Short version  عبد الحليم حافظ - نبتدى منين الحكاية.mp3" autoPlay></audio>

        <div className="splash">
            <img ref={backRef} className='back' src={background} alt="" />
            <div ref={yellowRef} className="yellow"></div>
            <div className="title">
                <div className="titlewhite">
                    <TextType 
                        text={["شقة ٢٠٧"]}
                        typingSpeed={150}
                        pauseDuration={1500}
                        showCursor
                        deletingSpeed={50}
                        cursorBlinkDuration={0.5}
                        loop={false}
                    />
                </div>
                <div className="buttonpri" onClick={handleStart}>
                    <Button text="START" />                
                </div>
            </div>
        </div>
        </main>
        </>
    );
}

export default Splash;
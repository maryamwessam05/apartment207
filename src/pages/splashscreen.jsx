import React from 'react';
import "./style.css"
import background from "../assets/home.jpg"
import TextType from '../components/TextType';

const Splash = () => {
    return (
        <>
        <main>
        <div className="splash">
            <img className='back' src={background} alt="" />

            <div className="title">
                <TextType 
                text={["شقة ٢٠٧"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                deletingSpeed={50}
                variableSpeedEnabled={false}
                variableSpeedMin={60}
                variableSpeedMax={120}
                cursorBlinkDuration={0.5}
                />

            </div>
        </div>

        </main>
        </>
      );
}
 
export default Splash;
<>
</>
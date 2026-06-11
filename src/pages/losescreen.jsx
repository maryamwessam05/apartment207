import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import clock from "../assets/clock.png"
import Button from '../components/button';


const LoseScreen = () => {
    return ( 
        <>
            <div className="loseframe">
                <img src={clock} alt="" />
                <h2>Time is up</h2>
                <div className="losebtns">
                    <Link>
                    <Button text="Restart" />
                    </Link>
                    <Link>
                    <Button text="Home" />
                    </Link>
                </div>
            </div>
        </>
     );
}
 
export default LoseScreen;
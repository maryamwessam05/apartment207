import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import clock from "../assets/clock.png"
import Button from '../components/button';


const LoseScreen2 = () => {
    return ( 
        <>
            <div className="loseframe">
                <img src={clock} alt="" />
                <h2>Time is up</h2>
                <div className="losebtns">
                    <Link to={"/leveltwo"}>
                    <Button text="Restart" />
                    </Link>
                    <Link to={"/levels"}>
                    <Button text="Home" />
                    </Link>
                </div>
            </div>
        </>
     );
}
 
export default LoseScreen2;
import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import clock from "../assets/clock.png"
import Button from '../components/button';


const LoseScreen3 = () => {
    return ( 
        <>
            <div className="loseframe">
                <img src={clock} alt="" />
                <h2>Time is up</h2>
                <div className="losebtns">
                    <Link to={"/levelthree"}>
                    <Button text="Restart" />
                    </Link>
                    <Link to={"/levels2"}>
                    <Button text="Home" />
                    </Link>
                </div>
            </div>
        </>
     );
}
 
export default LoseScreen3;
import React from 'react';
import "./style.css"
import winframe from "../assets/winframe.png"
import Button from '../components/button';
import { Link } from 'react-router-dom';

const WinScreen = (props) => {
    return ( 
        <>
            <div className="winscreen">
                <div className="winframe">
                    <img src={winframe} className='winframepic' alt="" />
                    <div className="wincont">
                        <div className="wintext">
                            <h4>CONGRATS YOU PASSED</h4>
                            <h1>LEVEL ONE {props.level}</h1>
                        </div>
                        <div className="winbtns">
                            <Link to={"/clues"}>
                            <Button text="View Clues" />
                            </Link>
                            <Link to={"/levels2"}> 
                            <Button text="Home" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default WinScreen;
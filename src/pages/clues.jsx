import React from 'react';
import "./style.css"
import back from "../assets/back.png"
import Button from '../components/button';
import briefcase from "../assets/briefcase.png"
import casette from "../assets/casseteclue.png";
import tea from "../assets/teaclue.png";
import key from "../assets/keyclue.png";
import letter from "../assets/letterclue.png";
import evileye from "../assets/eyeclue.png";
import { Link } from 'react-router-dom';
const Clues = () => {
    return ( 
        <>
            <div className="clues">
                <div className="cluerow">
                    <Link to={"/win"}>
                    <img className="backbtn" src={back} alt="" />
                    
                    </Link>
                    <h2>Clues</h2>
                    <Button text="Home" />
                </div>
                <div className="briefclues">
                    <img className='brief' src={briefcase} alt="" />
                        <img className='casclue' src={casette} alt="" />
                        <img className='teaclue' src={tea} alt="" />
                        <img className='keyclue' src={key} alt="" />
                        <img  className='letclue' src={letter} alt="" />
                        <img className='eyeclue' src={evileye} alt="" />

                </div>
            </div>
        </>
     );
}
 
export default Clues;
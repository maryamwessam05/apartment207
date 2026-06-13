import React, { useState } from 'react';
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
import letterOverlay from "../assets/letteroverlay.png";
import keyOverlay from "../assets/keyoverlay.png";
import teaOverlay from "../assets/teaoverlay.png";
import evileyeOverlay from "../assets/evileyeoverlay.png";
import casetteOverlay from "../assets/casetteoverlay.png";
import ObjectOverlay from "./objectoverlay";

const OBJECTS = {
  letter:  { id: 'letter',  title: 'Letter',    description: 'contains a hidden message', image: letterOverlay },
  evileye: { id: 'evileye', title: 'Evil Eye',  description: '',                           image: evileyeOverlay },
  tea:     { id: 'tea',     title: 'Tea',       description: '',                           image: teaOverlay },
  key:     { id: 'key',     title: 'Key',       description: 'opens a certain safe',       image: keyOverlay },
  casette: { id: 'casette', title: 'Casette',   description: 'decipher a code',            image: casetteOverlay },
};

const Clues = () => {
  const [selected, setSelected] = useState(null); 

  const open  = (id) => setSelected(id);
  const close = ()   => setSelected(null);

  return (
    <>
      {selected && (
        <ObjectOverlay
        title={OBJECTS[selected].title}
        description={OBJECTS[selected].description}
        image={OBJECTS[selected].image}
        isVisible={true}
        onClose={close}
        />
      )}

      <div className="clues">
        <div className="cluerow">
          <Link to={"/win"}>
            <img className="backbtn" src={back} alt="" />
          </Link>
          <h2>Clues</h2>
          <Link to={"/levels2"}>
          <Button text="Home" />
          </Link>
        </div>

        <div className="briefclues">
          <img className='brief' src={briefcase} alt="" />

          <img className='casclue'  src={casette}  alt="casette"  onClick={() => open('casette')}  style={{ cursor: 'pointer' }} />
          <img className='teaclue'  src={tea}      alt="tea"      onClick={() => open('tea')}      style={{ cursor: 'pointer' }} />
          <img className='keyclue'  src={key}      alt="key"      onClick={() => open('key')}      style={{ cursor: 'pointer' }} />
          <img className='letclue'  src={letter}   alt="letter"   onClick={() => open('letter')}   style={{ cursor: 'pointer' }} />
          <img className='eyeclue'  src={evileye}  alt="evil eye" onClick={() => open('evileye')}  style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </>
  );
};

export default Clues;
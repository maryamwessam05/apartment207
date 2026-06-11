import React, { useRef } from 'react';
import "./style.css";
import Button from '../components/button';
import dingSrc from "../music/ding.mp3";

const ObjectOverlay = ({ title, description, image, onAddToInventory, isVisible }) => {
  const dingRef = useRef(null);

  const handleAddToInventory = () => {
    if (dingRef.current) {
      dingRef.current.currentTime = 0;
      dingRef.current.play().catch(() => {});
    }
    onAddToInventory();
  };

  return (
    <div className={`objectoverlay-wrapper ${isVisible ? 'overlay-enter' : 'overlay-exit'}`}>
      <audio ref={dingRef} src={dingSrc} preload="auto" />
      <div className="objectoverlay">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <img src={image} alt={title} />
<Button text="Add to Inventory" onClick={handleAddToInventory} />      </div>
    </div>
  );
};

export default ObjectOverlay;
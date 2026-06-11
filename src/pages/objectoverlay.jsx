import React from 'react';
import "./style.css";
import Button from '../components/button';

const ObjectOverlay = ({ title, description, image, onAddToInventory, isVisible }) => {
  return (
    <div className={`objectoverlay-wrapper ${isVisible ? 'overlay-enter' : 'overlay-exit'}`}>
      <div className="objectoverlay">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <img src={image} alt={title} />
        <div onClick={onAddToInventory} >
        <Button text="Add to Inventory"  />

        </div>
      </div>
    </div>
  );
};

export default ObjectOverlay;
import React from 'react';
import "./button.css";

const Button = (props) => {
    return ( 
        <div className="button" onClick={props.onClick}>
            <h3>{props.text}</h3>
        </div>
     );
}
 
export default Button;
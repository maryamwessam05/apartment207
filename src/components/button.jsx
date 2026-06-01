import React from 'react';
import "./button.css";

const Button = (props) => {
    return ( 
        <>
        <div className="button">
            <h3>{props.text}</h3>
        </div>
        
        </>
     );
}
 
export default Button;
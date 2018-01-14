import React from "react";

export function Card(props) {
    return (
        <div className ="card" 
             style={{width: "25%" , height: "50%"}}
             onClick={props.onClick}>
                {props.symbol}
        </div>);
}

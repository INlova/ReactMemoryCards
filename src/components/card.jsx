import React from "react";

export function Card(props) {
    if (props.isFound) {
        return (
            <div className="card found"
                 style={{width: "25%" , height: "50%"}}>
                    {props.symbol}
            </div>);
    } else {
        return (
            <div className ={props.isVisible ? "card" : "card cover"} 
                 style={{width: "25%" , height: "50%"}}
                 onClick={props.onClick}>
                    {props.isVisible ? props.symbol: ""}
           </div>);
    }

}

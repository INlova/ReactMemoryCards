import React from "react";

export function Card(props) {
    const classes = ["card"];
    if (props.isFound) {
        classes.push("found");
    } else if (!props.isVisible) {
        classes.push("cover");
    }
    return (
        <div className="card-container" style={props.style}>
            <div className={classes.join(" ")} 
                 onClick={props.isFound ? null : props.onClick}>
                {props.isFound || props.isVisible ? props.symbol: ""}
            </div>
        </div>
        );
}

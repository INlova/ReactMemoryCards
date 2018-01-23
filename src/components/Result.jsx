import React from "react";

export function Result(props) {
    return (
        <div className="result popup">
             <p>Wow! You've found them all!</p>
             <p>Want to play again?</p>
             <p>Just chose next level:</p>
                <p>
                    <button onClick={ () => props.onLevelSelected("easy") }>Easy</button>
                    <button onClick={ () => props.onLevelSelected("normal") }>Normal</button>
                    <button onClick={ () => props.onLevelSelected("hard") }>Hard</button>
                </p>
       </div>
    );
};

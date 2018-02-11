import React from "react";

export default function result(props) {
    return (
        <div className="result popup">
             <p>Wow! You've found them all!</p>
             <p>Want to play again?</p>
             <p>Just chose next level:</p>
                <p>
                    <button className="play easy" onClick={ () => props.onLevelSelected("easy") }>Easy</button>
                    <button className="play normal" onClick={ () => props.onLevelSelected("normal") }>Normal</button>
                    <button className="play hard" onClick={ () => props.onLevelSelected("hard") }>Hard</button>
                </p>
       </div>
    );
};

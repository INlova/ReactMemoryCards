import React from "react";

export default function LevelSelection(props) {
    return (<div className="levels popup">
                <p>Hello and welcome to the Memory Cards game</p>
                <p>Flip the cards over and match the pairs as quickly as possible!</p>
                <p>Let's start with:</p>
                <p>
                    <button onClick={ () => props.onLevelSelected("easy") }>Easy</button>
                    <button onClick={ () => props.onLevelSelected("normal") }>Normal</button>
                    <button onClick={ () => props.onLevelSelected("hard") }>Hard</button>
                </p>
            </div>);
};

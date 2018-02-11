import React from "react";

export default function levelSelection(props) {
    return (<div className="levels popup">
                <p>Hello and welcome to the Memory Cards game</p>
                <p>Flip the cards over and match the pairs as quickly as possible!</p>
                <p>Let's start with:</p>
                <p>
                    <button className="play easy" onClick={ () => props.onLevelSelected("easy") }>Easy</button>
                    <button className="play normal" onClick={ () => props.onLevelSelected("normal") }>Normal</button>
                    <button className="play hard" onClick={ () => props.onLevelSelected("hard") }>Hard</button>
                </p>
            </div>);
};

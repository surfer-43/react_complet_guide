import React from 'react';
// import Radium from "radium";

import './Person.css';

const person = (props) => {
    const personDescriptor = (props.children)? <p>{props.children}</p>: null;
    /* const style = {
        "@media(min-width: 500px)": {
            width: "450px"
        }
    }; */

    const style = {};

    return (
        <div className="person" style={style}>
            <p onClick={props.deletePerson}>{props.name} is {props.age} years old</p>
            {personDescriptor}
            <input type="text" onChange={props.changed} value={props.name}/>
            {/*<p>{props.children}</p> */}
            <button onClick={props.deletePerson}>delete person</button>
        </div>
    )
}

// export default Radium(person);
export default person;
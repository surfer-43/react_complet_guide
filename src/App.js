import React, { Component } from 'react';
import './App.css';
// import Radium, {StyleRoot}from "radium";

import styles from "./App.module.css";
import Person from './components/Person/Person';

class App extends Component {
  state = {
    people: [
      {
        id: 21,
        name:'Bob',
        age: '37'
      }, 
      {
        id: 13,
        name:'Seth',
        age: '21'
      }, 
      {
        id: 9,
        name:'Crystal',
        age: '43'
      }, 
    ],
    showPeople: false,
    favouriteColors: ["red", "green", "blue"]
  };
  alternateNames = [{id: 5, name: "Johnny", age: '22'}, {id: 3, name: "Sam", age: '57'}, {id:22, name: "Sarah", age: '13'} ];
  
  onclickNameChange = (evt, i) => {    
    let modifiedPeople = [...this.state.people]; 

    if( typeof i !==  "number"){
      modifiedPeople = modifiedPeople.map((person, i) => {
        return {
          id: this.alternateNames[i].id,
          name: this.alternateNames[i].name,
          age: this.alternateNames[i].age
        }
      });
    } else {
      modifiedPeople[i].name = this.alternateNames[i].name;
      modifiedPeople[i].age = this.alternateNames[i].age;
    }

    this.setState({
      ...this.state,
      people: modifiedPeople
    });
  }

  revealPeople = () => {
    this.setState({
      // ...this.state, - this line would spread all the properties of state into the new object
      showPeople: !this.state.showPeople
    });
    console.log("this is the new state of the app: ", this.state);
  }

  onChangeUpdatename =(evt, id) => {
    const people = [...this.state.people]; 
    const modifiedPersonIndex = people.findIndex(p => {
      return p.id == id
    });

    people[modifiedPersonIndex].name = evt.target.value

    this.setState({
      ...this.state,
      people: people
    });
  }

  deletePersonHandler = (i) => {
    console.log("did we get to the delete person with an id? ", i);
    const currentPeople = [...this.state.people];
    currentPeople.splice(i, 1);

    this.setState({
      people: currentPeople
    })
  }

  render() {

    /*const style = {
      button:{
        backgroundColor: 'white',
        font: "inherit",
        border: "solid thin red",
        padding: '8px',
        curser: 'pointer'
      },
      showPeopleBtn: {
        backgroundColor: 'green',
        color:"white",
        font: "inherit",
        border: "solid thin seafoam",
        padding: '8px',
        curser: 'pointer',
        ":hover": {
          backgroundColor: 'lightgreen',
          color: "black"
        }
      },
      "@media(min-width: 500px)": {
        
          // width: "450px"
          border: "medium lime dotted",
          "flexDirection": "column",
          // "justifyContent": "center",
          "alignItems": "center"
        
      }
    }*/

    const style = {};

    let people = null;

    if(this.state.showPeople) {
      console.log("should be showing all the people");
      people = (
        <div className="person_container" style={style}>
          {this.state.people.map((person, index) =>{
            console.log("what is the person: ", person, " : ", index);
            return <Person
              className="person"
              deletePerson={()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event)=>{this.onChangeUpdatename(event, person.id)}} />
          })}       
        </div>
      )
      /* style.showPeopleBtn.backgroundColor = "red";
         style.showPeopleBtn[":hover"] = {
           backgroundColor: "lightsalmon",
           color: "black"
         } */
    }

    const classes = [];
    if(this.state.people.length <= 2) {
      classes.push("red");
    }
    if(this.state.people.length <= 1) {
      classes.push("bold");
    }

    return (
      // <StyleRoot>
        <div className="container">
          <h1>new react app</h1>
          {/* <button onClick={this.onclickNameChange.bind(this, "Frank")}>onclickNameChanges</button>
            the version below can be inefficient - useable for specific instances but 
            not always the best use .bind() might be a stronger way to do it
          */}
          <p className={classes.join(" ")}>People are visible</p>
          <button
            className={style.button}
            onClick={() => this.onclickNameChange(this)}>changeNames</button>
          <button 
            className={style.showPeopleBtn}
            onClick={this.revealPeople}
            >Show People</button>
          {people}
        </div>
      // </StyleRoot>
    );
  }
}

/**
 * Radium is a higher order function that is adding functionality 
 * to the app component
 * in this case we are able to now use sudo selectors and media queries supplied by Radium
 */
// export default Radium(App);
export default App;

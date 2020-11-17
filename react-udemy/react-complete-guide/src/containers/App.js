import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component{

  state = {
    persons: [
      { id:1, name: 'Max', age: 28},
      { id:2, name: 'Peter', age: 22},
      { id:3, name: 'Paul', age: 36}
    ],
    otherState: 'Some other state',
    showPersons: false
  } 

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render(){
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}></Persons>          
        </div>
      );     
    }

    return (
        <div className={classes.App}>
          <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons} 
          clicked={this.togglePersonsHandler}/>
          {persons}
        </div>
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!!!'));
    );
  }
   
}


export default App;

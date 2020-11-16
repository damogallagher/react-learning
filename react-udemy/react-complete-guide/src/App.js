import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                    key={person.id}
                    name={person.name} 
                    age={person.age}
                    click={() => this.deletePersonHandler(index)}
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
          </div>
      );
    }

    return (
      <div className="App">
      <h1>Hi, I am a React App</h1>
      <button style={style}
        onClick={this.togglePersonsHandler}>
        Toggle Persons
      </button>

        {persons}

      </div>
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!!!'));
    );
  }
   
}


export default App;

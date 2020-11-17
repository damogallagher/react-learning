import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let btnClass = [];
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person                     
                    name={person.name} 
                    age={person.age}
                    click={() => this.deletePersonHandler(index)}
                    changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    </ErrorBoundary>
          })}
          </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    } 
    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    } 

    return (
        <div className={classes.App}>
        <h1>Hi, I am a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>

          {persons}

        </div>
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!!!'));
    );
  }
   
}


export default App;

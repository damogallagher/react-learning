import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';


class App extends Component{

  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }
  state = {
    persons: [
      { id:1, name: 'Max', age: 28},
      { id:2, name: 'Peter', age: 22},
      { id:3, name: 'Paul', age: 36}
    ],
    otherState: 'Some other state',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  } 

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }  

  // Important hook
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  // Important hook
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate', nextProps, nextState);
    return true;
  }
  
  // Important hook
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }
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

    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      };
    });
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

  loginHandler = () => {
    console.log('in login handler');
    this.setState({authenticated: true});
  };

  render(){
    console.log('[App.js] render');
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}></Persons>          
        </div>
      );     
    }

    return (
        <Aux>
          <button onClick={() => {this.setState({ showCockpit: false})}}>Remove Cockpit</button>

          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>
          {this.state.showCockpit ? (
          <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length} 
            clicked={this.togglePersonsHandler}
            />
    ) : null }
          {persons}
          </AuthContext.Provider>
        </Aux>
      // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I am a React App!!!'));
    );
  }
   
}


export default withClass(App, classes.App);

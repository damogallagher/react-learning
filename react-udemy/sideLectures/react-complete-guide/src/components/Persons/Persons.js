import React, { PureComponent } from "react";
import Person from "./Person/Person";


class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //     console.log('[Persons.js] getDerivedStateFromProps');
  //     return state;
  // }

  // componentWillReceiveProps(props) {
  //     console.log('[Persons.js] componentWillReceiveProps', props);
  // }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("[Persons.js] shouldComponentUpdate", nextProps, nextState);
//     if (nextProps.persons !== this.props.persons) {
//       return true;
//     } else {
//       return false;
//     }
//   }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate", prevProps, prevState);
    return { message: "Snapshot!!!" };
  }

  //Most popular hook - fetch new data from API for example
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "[Persons.js] componentDidUpdate",
      prevProps,
      prevState,
      snapshot
    );
  }

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {

      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;

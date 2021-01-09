import React, { useState, Component } from 'react'
import './App.css';
import Person from './Person/person'
import Radium,{StyleRoot} from 'radium'

// In useState  setPersonStare will repleace with old one
// where as state is class will merge with old data when setState calls
// const App = props => {
//   const [personState,setPersonState] = useState({
//     persons:[
//       {name: "Akshat", age: 20},
//       {name: "Aayush", age: 16},
//       {name: "Jyoti", age: 45}
//     ]
//   });

//   const [otherState, setOtherState] = useState("This is some other state data");

//   console.log(personState,otherState)

//   const switchNameHandler = () => {
//     setPersonState({
//       persons:[
//         {name: "Akshat gupta", age: 20},
//         {name: "Aayush", age: 16},
//         {name: "Jyoti", age: 45}
//       ]
//     })
//   }

//   return(
//     <div className="App">
//       <h1>Hi, I am Akshat Gupta</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personState.persons[0].name} age={personState.persons[0].age} >My hobbies: Racing</Person>
//       <Person name={personState.persons[1].name} age={personState.persons[1].age} />
//       <Person name={personState.persons[2].name} age={personState.persons[2].age} />
//     </div>
//   );
// }

// export default App;




//  THIS IS HOW CLASS WORKS
class App extends Component {
  state = {
    persons: [
      {id: 'flkjdf',name: "One", age: 1},
      {id: 'rqklk',name: "two", age: 2},
      {id: 'fqlkf;',name: "three", age: 3}
    ],
    otherState: "This is other state",
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;  If we use this then person pointer will point to the original 
    // state.person array the when we do splice in next line then it delete from original array without setStart
    // Instead of that we can use persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({
      persons: persons
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  togglePersonHandler = () => { 
    // const doesShow = this.state.showPersons;
    // console.log(doesShow)
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render(){
    // This is inline style
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color:'black'
      }
    };
    
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            name={person.name} 
            age={person.age} 
            click = {() => {this.deletePersonHandler(index)}} 
            changed = {(event) => this.nameChangedHandler(event,person.id)}
            key={person.id} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }
    

    return(
      <StyleRoot>
      <div className="App">
        <h1>Hi, I am Akshat Gupta</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button 
            // onClick={() => this.switchNameHandler("Akshat gupta")} // Inefficient way to do so
            onClick = {this.togglePersonHandler}
            style={style}> 
            Switch Name
        </button>
        {persons}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hi, I\'m Akshat Gupta'));
  }
}

export default Radium(App);

import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {

	/**
	 * The state object provided by React
	 * @type {{persons: *[], showPersons: boolean}}
	 */
	state = {
		persons: [
			{id: 'few324w', name: 'Max', age: 28},
			{id: '3fwaegf', name: 'Manu', age: 28},
			{id: '432fweq', name: 'Stephanie', age: 29}
		],
		showPersons: false
	};


	/**
	 * Allows for 2-way data binding between input that was selected for each name
	 * @param event
	 */
	nameChangedHandler = ( event, id ) => {
		// get the index for the person "selected"
		const personIndex = this.state.persons.findIndex(p => p.id === id);

		// make a copy of the person object
		const person = {...this.state.persons[personIndex]};

		// set the name with the 2-way data binding
		person.name = event.target.value;

		// create another copy of `this.state.persons` with the new `name`
		const persons = [...this.state.persons];
		// set the new object
		persons[personIndex] = person;

		// set the new state
		this.setState({ persons: persons });

		console.log(`personIndex: ${personIndex}`);
		console.log(`person: ${JSON.stringify(person, null, 2)}`);
		console.log(`persons: ${JSON.stringify(persons, null, 2)}`);
		console.log(`persons[personIndex]: ${JSON.stringify(persons[personIndex], null, 2)}`);
	};

	/**
	 * Allows us to delete the given person from the `persons` array.
	 * @param personIndex - the index that is received from `map()`
	 */
	deletePersonHandler = (personIndex) => {
		// make a copy of the `persons` array
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons})
	};

	/**
	 * This will show/hide the person array when button is pressed
	 */
	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow})
	};

	/**
	 * The React render function, similar to React.createElement()
	 * @returns {*}
	 */
	render() {

		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer'
		};

		// initialize the variable
		let persons = null;

		// this check is to see if the `persons` array should be shown/hidden
		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
							return <Person
								name={person.name}
								age={person.age}
								click={() => this.deletePersonHandler(index)}
								key={person.id}
								changed={(event) => this.nameChangedHandler(event, person.id)}/>
							}
						)
					}
				</div>
			)
		}

		return (
			<div className="App">
				<h1>Hi I am a React app</h1>
				<button
					style={style}
					onClick={this.togglePersonsHandler}>Toggle Persons
				</button>
				{persons}
			</div>
		);
	}
}

export default App;

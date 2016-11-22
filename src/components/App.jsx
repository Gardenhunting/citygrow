import React, { Component } from 'react';
import GardenForm from './GardenForm/GardenForm.jsx';
import GardenList from './GardenList/GardenList.jsx';
// import GardenListItem from './GardenListItem/GardenListItem.jsx';
import GardenDisplay from './GardenDisplay/GardenDisplay.jsx';
// import style from './App.css';

class App extends Component {

  constructor(props) {
    super();
    console.log(this);
    this.state = {
      gardens: [],
      selected: ''
    };
  }

  changeSelection(num) {
    this.setState({
      selected: this.state.gardens[num],
    });
  }

  getAllGardens() {
    fetch(`/db/gardens`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        gardens: data
      });
      console.log('************App.jsx data: ' + data);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <header>
        <h1>CityGrow</h1>
      </header>
      <GardenForm />
      <h1>**********Garden List************</h1>
      <GardenList
        getAllGardens={this.getAllGardens.bind(this)}
        collection={this.state.gardens}
        changeSelection={this.changeSelection.bind(this)}
      />
      <h1>***********Garden Display***********</h1>
      <GardenDisplay
        garden={this.state.selected}
      />

      </div>
    );
  }
}

export default App;

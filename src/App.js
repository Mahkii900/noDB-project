import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/Header'
import ShipViewer from './components/ShipViewer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      ships: [],
      hulls: [],
      parts: []
    }

    this.addNewShip = this.addNewShip.bind(this)
  }

  componentDidMount() {
    axios.get('/api/ships').then(res => {
      this.setState({ships: res.data})
    })
    axios.get('/api/hulls').then(res => {
      this.setState({hulls: res.data})
    })
    axios.get('/api/parts').then(res => {
      this.setState({parts: res.data})
    })
  }

  addNewShip(name) {
    axios.post('/api/ships', {name: name}).then(res => {
      this.setState({ships: res.data})
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ShipViewer ships={this.state.ships} hulls={this.state.hulls} parts={this.state.parts} addShip={this.addNewShip}/>
      </div>
    );
  }
}

export default App;
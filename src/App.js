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
      parts: [],
      partsOfType: []
    }

    this.addNewShip = this.addNewShip.bind(this)
    this.getPartsOfType = this.getPartsOfType.bind(this)
    this.updateShip = this.updateShip.bind(this)
    this.deleteShip = this.deleteShip.bind(this)
  }

  componentDidMount() {
    let error = {
      name: "ERROR",
      id: 0,
      hull: {
        class: "ERROR",
        slots: [{name: 'ERROR', type: 'ERROR'}]
      }
    }

    axios.get('/api/ships').then(res => {
      this.setState({ships: res.data})        //Gets all ships
    }).catch(() => {this.setState({ships: error})
      alert('Unable to get ships!')})
    axios.get('/api/hulls').then(res => {
      this.setState({hulls: res.data})      //Gets all hulls
    }).catch(() => {this.setState({hulls: [{class: "ERROR", slots: [{name: 'ERROR', type: 'ERROR'}]}]})
      alert('Unable to get hulls!')})
    axios.get('/api/parts').then(res => {
      this.setState({parts: res.data})      //Gets all parts
    }).catch(() => {this.setState({parts: [{name: 'ERROR', type: 'ERROR'}]})
      alert('Unable to get parts!')})
  }

  addNewShip(ship) {
    axios.post('/api/ships', ship).then(res => {
      this.setState({ships: res.data})      //Adds a new ship
    })
  }

  getPartsOfType(type) {
    axios.get(`/api/parts/${type}`).then(res => {
      this.setState({partsOfType: res.data})    //Get a part by type
    })
  }

  updateShip(id, newInfo) {
    axios.put(`/api/ships/${id}`, newInfo).then(res => {
      this.setState({ships: res.data})          //Updates ship information
    })
  }

  deleteShip(id) {
    axios.delete(`/api/ships/${id}`).then(res => {
      this.setState({ships: res.data})          //Deletes a selected ship
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <Header/>
        </div>
        <div className="ship-display">
          <ShipViewer
            ships={this.state.ships}
            hulls={this.state.hulls}
            parts={this.state.parts}
            addShip={this.addNewShip}
            getParts={this.getPartsOfType}
            partTypes={this.state.partsOfType}
            updateShip={this.updateShip}
            delete={this.deleteShip}
          />
        </div>
      </div>
    );
  }
}

export default App;
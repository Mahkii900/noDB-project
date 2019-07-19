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

  getPartsOfType(type) {
    axios.get(`/api/parts/${type}`).then(res => {
      this.setState({partsOfType: res.data})
    })
  }

  updateShip(id, newInfo) {
    axios.put(`/api/ships/${id}`, newInfo).then(res => {
      this.setState({ships: res.data})
    })
  }

  deleteShip(id) {
    axios.delete(`/api/ships/${id}`).then(res => {
      this.setState({ships: res.data})
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
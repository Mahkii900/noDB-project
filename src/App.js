import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import Header from './components/Header'
import ShipViewer from './components/ShipViewer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      ships: []
    }
  }

  componentDidMount() {
    axios.get('/api/ships').then(res => {
      this.setState({ships: res.data})
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ShipViewer ships={this.state.ships}/>
      </div>
    );
  }
}

export default App;
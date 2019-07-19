import React, {Component} from 'react'

import ShipDesigner from './ShipDesigner'

export default class ShipViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            id: null,
            showShip: false,
            editing: false,
            adding: false,
            shipName: 'New Name'
        }

        this.addAShip = this.addAShip.bind(this)
    }

    indexFinder(id) {
        this.setState({index: this.props.ships.findIndex(ele => ele.id === id)})
    }

    selectShip(id) {
        this.setState({id: id, showShip: true})
        this.indexFinder(id)
    }

    showAdd() {
        this.setState({adding: !this.state.adding})
    }

    inputChangeHandler(e) {
        this.setState({shipName: e.target.value})
    }

    addAShip(name) {
        this.props.addShip(name)
        this.showAdd()
    }

    render() {
        return(
            <div className="ship-console">
                <div className="ship-stuff">
                    <div className="ship-designer">
                            <button onClick={() => this.showAdd()}>Add Ship</button>
                            {this.state.adding ? (
                                <div>
                                    <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                    <button onClick={() => this.addAShip(this.state.shipName)}>Add Ship</button>
                                    <button onClick={() => this.showAdd()}>Cancel</button>
                                </div>
                            ): null}
                    </div>
                    {this.props.ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id)}>{ele.name}</li>})}
                    {this.state.showShip ? (
                        <div>
                            <div className="ship-display">{this.props.ships[this.state.index].name}</div>
                            <ShipDesigner hulls={this.props.hulls} parts={this.props.parts}/>
                        </div>
                    ): 
                    (<div className="ship-display">Select a ship!</div>)}
                </div>
                
            </div>
        )
    }
}
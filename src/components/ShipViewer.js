import React, {Component} from 'react'

import ShipDesigner from './ShipDesigner'

export default class ShipViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            id: null,
            showShip: false,
            editing: false
        }
    }

    indexFinder(id) {
        this.setState({index: this.props.ships.findIndex(ele => ele.id === id)})
    }

    selectShip(id) {
        this.setState({id: id, showShip: true})
        this.indexFinder(id)
    }

    render() {
        return(
            <div className="ship-console">
                <div className="ship-stuff">
                    {this.props.ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id)}>{ele.name}</li>})}
                    {this.state.showShip ? (
                        <div>
                            <div className="ship-display">{this.props.ships[this.state.index].name}</div>
                            <ShipDesigner hulls={this.props.hulls} parts={this.props.parts}/>
                        </div>
                    ): 
                    (<div className="ship-display">Select a ship!</div>)}
                </div>
                <div className="ship-designer">
                </div>
            </div>
        )
    }
}
import React, {Component} from 'react'
import Ship from './Ship'
import ShipDesigner from './ShipDesigner'

export default class ShipViewer extends Component {
    constructor() {
        super()
        this.state = {
            id: null
        }
        //this.viewOneShip = this.viewOneShip.bind(this)
    }

    selectShip(id) {
        this.setState({id: id})
    }

    render() {
        return(
            <div>
                <div className="ship-list">
                    {this.props.ships.map(ele => {return <div key={ele} onClick={}>{ele}</div>})}
                </div>
                <div className="ship-designer">
                    <ShipDesigner/>
                </div>
            </div>
        )
    }
}
import React, {Component} from 'react'

export default class Ship extends Component {
    cancelHullChanges(newHull) {
        this.props.cancelHull(this.props.shipHull)
        this.updateShip(newHull)
    }

    updateShip(hull) {
        this.props.edit()
        this.props.updateShip(this.props.shipID, {hull})
    }

    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele.name}>{ele.name}</div>})}
                <button onClick={() => this.cancelHullChanges(this.props.hull)}>Confirm Hull Change</button>
            </div>
        )
    }
}
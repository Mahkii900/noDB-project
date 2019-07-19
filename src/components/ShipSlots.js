import React, {Component} from 'react'

export default class ShipSlots extends Component {
    createHullUpdate(part) {
        let newHull = {hull: [...this.props.slots]}
        newHull.hull.splice(newHull.hull.findIndex(ele => ele.type === part.type), 1, part)
        this.updateSlots(newHull)
    }

    updateSlots(hull) {
        console.log(hull)
        this.props.updateShip(this.props.shipID, hull)
    }

    render() {
        return(
            <div>
                {this.props.partsType.map(ele => <li key={ele.name} onClick={() => this.createHullUpdate(ele)}>{ele.name}</li>)}
            </div>
        )
    }
}
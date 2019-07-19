import React, {Component} from 'react'

export default class Ship extends Component {
    constructor() {
        super()
        this.state = {
            showParts: false
        }
    }

    partsShowing() {
        this.setState({showParts: true})
    }

    sortParts(type) {
        this.props.getParts(type)
        this.partsShowing()
    }

    createHullUpdate(part) {
        let newHull = {hull: [...this.props.slots]}
        newHull.hull.splice(newHull.hull.findIndex(ele => ele.type === part.type), 1, part)
        this.updateSlots(newHull)
    }

    updateSlots(hull) {
        this.props.updateShip(this.props.shipID, hull)
    }

    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele.name} onClick={() => this.sortParts(ele.type)}>{ele.name}</div>})}
                {this.state.showParts ? this.props.partsType.map(ele => {return <li key={ele.name} onClick={() => this.createHullUpdate(ele)}>{ele.name}</li>}
                ): <div>Select A Slot</div>}
            </div>
        )
    }
}
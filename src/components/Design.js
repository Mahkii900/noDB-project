import React, {Component} from 'react'

export default class Ship extends Component {
    cancelHullChanges(newHull) {
        this.props.hideSlots()
        this.props.cancelHull(this.props.shipHull)
        this.updateShip(newHull)
    }

    updateShip(hull) {
        this.props.edit()
        this.props.updateShip(this.props.shipID, {hull})
    }

    render() {
        return(
            <div className='equipment-slots'>
                <div className='equipment-list'>
                    {this.props.slots.map(ele => {return <li key={ele.type}>{ele.name}</li>})}
                </div>
                <div className='button-box'>
                    <button onClick={() => this.cancelHullChanges(this.props.hull)}>Confirm Hull Change</button>
                </div>
            </div>
        )
    }
}
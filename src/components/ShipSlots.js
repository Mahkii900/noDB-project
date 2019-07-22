import React, {Component} from 'react'

export default class ShipSlots extends Component {
    cancelSlotUpdate(part) {
        let slots = this.props.ship.hull.slots.slice()
        this.props.saveSlots(slots)
        this.props.edit()
        this.createHullUpdate(part)
    }

    //This is necessary in order to allow updateShip to work
    //It takes the selected part and puts it in the selected equipment slot
    //and gives updateSlots an object with a hull object inside
    createHullUpdate(part) {
        let hull = {class: this.props.hullClass, slots: this.props.slots}
        hull.slots.splice(hull.slots.findIndex(ele => part.type === ele.type), 1, part)
        this.updateSlots({hull})
    }

    updateSlots(hull) {
        this.props.updateShip(this.props.shipID, hull)
    }

    render() {
        return(
            <div className='equipment'>
                {this.props.partsType.map(ele => <div className='equipment-part'><li key={ele.name} onClick={() => this.cancelSlotUpdate(ele)}>{ele.name}</li></div>)}
            </div>
        )
    }
}
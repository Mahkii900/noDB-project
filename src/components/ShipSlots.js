import React, {Component} from 'react'

export default class ShipSlots extends Component {
    render() {
        return(
            <div>
                {this.props.partsType.map(ele => <li key={ele.name}>{ele.name}</li>)}
            </div>
        )
    }
}
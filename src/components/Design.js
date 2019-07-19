import React, {Component} from 'react'

export default class Ship extends Component {
    updateShip(hull) {
        this.props.updateShip(this.props.shipID, {hull})
    }

    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele.name}>{ele.name}</div>})}
                <button onClick={() => this.updateShip(this.props.hull)}>Confirm Hull Change</button>
            </div>
        )
    }
}
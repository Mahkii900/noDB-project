import React, {Component} from 'react'
import Design from './Design'

export default class ShipDesigner extends Component {
    constructor() {
        super()
        this.state = {
            showSlots: false,
            index: 0,
            showParts: false
        }
    }

    selectedHull(type) {
        //const showslots = this.state.showSlots
        const index = this.props.hulls.findIndex(ele => ele.class === type)
        this.setState({showSlots: true, index: index})
    }

    render() {
        const hulls  = this.props.hulls
        return(
            <div>
                {hulls.map(ele => {return <li key={ele.class} onClick={() => this.selectedHull(ele.class)}>{ele.class}</li>})}
                {this.state.showSlots ? 
                (<div>
                    <Design
                        slots={hulls[this.state.index].slots}
                        updateShip={this.props.updateShip}
                        shipID={this.props.shipID}
                        hull={hulls[this.state.index]}
                    />
                </div>
                ) : <div>Select A Hull</div>
                }
            </div>
        )
    }
}
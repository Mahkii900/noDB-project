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

    selectedHull(name) {
        //const showslots = this.state.showSlots
        const index = this.props.hulls.findIndex(ele => ele.name === name)
        this.setState({showSlots: true, index: index})
    }

    render() {
        const hulls  = this.props.hulls
        return(
            <div>
                {hulls.map(ele => {return <li key={ele.name} onClick={() => this.selectedHull(ele.name)}>{ele.name}</li>})}
                {this.state.showSlots ? 
                (<div>
                    <Design
                        parts={this.props.parts}
                        slots={hulls[this.state.index].slots}
                        getParts={this.props.getParts}
                        partsType={this.props.partsType}
                        updateShip={this.props.updateShip}
                        shipID={this.props.shipID}
                    />
                </div>
                ) : <div>Select A Hull</div>
                }
            </div>
        )
    }
}
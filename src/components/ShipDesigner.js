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
        const index = this.props.hulls.findIndex(ele => ele.class === type)
        this.setState({showSlots: true, index: index})
    }

    listHulls(ele) {
        if (this.props.currentHull !== ele.class) {
            return (<li key={ele.class} onClick={() => this.selectedHull(ele.class)}>{ele.class}</li>)
        }
    }

    render() {
        const hulls  = this.props.hulls
        return(
            <div>
                {hulls.map(ele => this.listHulls(ele))}
                {this.state.showSlots ? 
                (<div>
                    <Design
                        slots={hulls[this.state.index].slots}
                        updateShip={this.props.updateShip}
                        shipID={this.props.shipID}
                        hull={hulls[this.state.index]}
                        edit={this.props.edit}
                        cancelHull={this.props.cancelHull}
                        shipHull={this.props.shipHull}
                    />
                </div>
                ) : <div>Select A Hull</div>
                }
            </div>
        )
    }
}
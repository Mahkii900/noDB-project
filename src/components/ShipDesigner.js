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
            return (<div className='hull-list'><li key={ele.class} onClick={() => this.selectedHull(ele.class)}>{ele.class}</li></div>)
        }
    }

    render() {
        const hulls  = this.props.hulls
        return(
            <div>
                <div className="edit-hull-list">
                    <div className='edit-hull-list-title'>{'Hull Types (Select A Hull To See Equipment Slots)'}</div>
                    <div>
                        {hulls.map(ele => this.listHulls(ele))}
                    </div>
                </div>
                {this.state.showSlots ? 
                (<div className='edit-hull-preview'>
                    <div className='edit-hull-preview-title'>This Hull Type Has The Following Equipment Slots</div>
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
                ) : <div className='edit-hull-notice'>{'>>>Select A Hull Type To See Equipment Slots<<<'}</div>
                }
            </div>
        )
    }
}
import React, {Component} from 'react'

import ShipDesigner from './ShipDesigner'
import ShipSlots from './ShipSlots'

export default class ShipViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            id: null,
            showShip: false,
            editing: false,
            adding: false,
            showParts: false,
            shipName: 'New Name'
        }

        this.addAShip = this.addAShip.bind(this)
    }

    indexFinder(id) {
        this.setState({index: this.props.ships.findIndex(ele => ele.id === id)})
    }

    selectShip(id) {
        this.setState({id: id, showShip: true})
        this.indexFinder(id)
    }

    showAdd() {
        this.setState({adding: !this.state.adding})
    }

    showEdit() {
        this.setState({editing: !this.state.editing})
    }

    inputChangeHandler(e) {
        this.setState({shipName: e.target.value})
    }

    addAShip(name) {
        this.props.addShip(name)
        this.showAdd()
    }

    showParts() {
        this.setState({showParts: true})
    }

    sortParts(type) {
        this.props.getParts(type)
        this.showParts()
    }

    render() {
        return(
            <div className="ship-console">
                <div className="ship-stuff">
                    <div className="ship-list">
                        <button onClick={() => this.showAdd()}>Add Ship</button>
                        {this.state.adding ? (
                            <div>
                                <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                <button onClick={() => this.addAShip(this.state.shipName)}>Add Ship</button>
                                <button onClick={() => this.showAdd()}>Cancel</button>
                            </div>
                        ): null}
                        {this.props.ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id)}>{ele.name}</li>})}
                    </div>
                    <div className="ship-designing">
                        {this.state.showShip ? (
                            <div className="editing-console">
                                <div>
                                    {this.props.ships[this.state.index].name}
                                    {this.props.ships[this.state.index].hull.slots.map(ele => {return <li key={ele} onClick={() => this.sortParts(ele)}>{ele}</li>})}
                                    <button onClick={() => this.showEdit()}>Edit</button>
                                </div>
                                {this.state.editing ? (
                                    <div>
                                        <div>
                                            <ShipDesigner
                                                hulls={this.props.hulls}
                                                parts={this.props.parts}
                                                getParts={this.props.getParts}
                                                partsType={this.props.partTypes}
                                                updateShip={this.props.updateShip}
                                            />
                                        </div>
                                        <div>
                                            {this.state.showParts ? <div>
                                                <ShipSlots
                                                partsType={this.props.partTypes}
                                                updateShip={this.props.updateShip}
                                                />
                                            </div> : <div>Select A Slot</div>}
                                        </div>
                                        <button onClick={() => this.showEdit()}>Save</button>
                                    </div>
                                ): null}
                            </div>
                        ): (<div>Select A Ship</div>)}
                    </div>
                </div> 
            </div>
        )
    }
}
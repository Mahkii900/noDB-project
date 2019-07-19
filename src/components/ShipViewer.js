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
        this.setState({shipName: 'New Name'})
        this.showAdd()
    }

    showParts() {
        this.setState({showParts: true})
    }

    sortParts(type) {
        this.props.getParts(type)
        this.showParts()
    }

    deleteShip() {
        const id = this.props.ships[this.state.index].id
        this.showEdit()
        this.setState({showShip: false})
        this.props.delete(id)
    }

    changeShipName(id, name) {
        this.props.updateShip(id, {name: name})
        this.setState({shipName: 'New Name'})
    }

    render() {
        return(
            <div className="ship-console">
                    <div className="ship-list">
                        <button onClick={() => this.showAdd()}>Add Ship</button>
                        {this.state.adding ? (
                            <div>
                                <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                <button onClick={() => this.addAShip(this.state.shipName)}>Add Ship</button>
                                <button onClick={() => this.showAdd()}>Cancel</button>
                            </div>
                        ): null}
                        <div className='all-ships'>
                            {this.props.ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id)}>{ele.name}</li>})}
                        </div>
                    </div>
                    <div className="ship-designing">
                        {this.state.showShip ? (
                            <div className="editing-console">
                                <div>
                                    {this.props.ships[this.state.index].name}
                                    {this.props.ships[this.state.index].hull.slots.map(ele => {return <li key={ele.name} onClick={() => this.sortParts(ele.type)}>{ele.name}</li>})}
                                </div>
                                <div>
                                    {this.state.editing ? (
                                        <div>
                                            <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                            <button onClick={() => this.changeShipName(this.state.id, this.state.shipName)}>Change Ship Name</button>
                                        <div>
                                            <ShipDesigner
                                                hulls={this.props.hulls}
                                                parts={this.props.parts}
                                                getParts={this.props.getParts}
                                                partsType={this.props.partTypes}
                                                updateShip={this.props.updateShip}
                                                shipID={this.props.ships[this.state.index].id}
                                            />
                                        </div>
                                        <div>
                                            {this.state.showParts ? <div>
                                                <ShipSlots
                                                    slots={this.props.ships[this.state.index].hull.slots}
                                                    hullClass={this.props.ships[this.state.index].hull.class}
                                                    partsType={this.props.partTypes}
                                                    updateShip={this.props.updateShip}
                                                    shipID={this.props.ships[this.state.index].id}
                                                />
                                            </div> : <div>Select A Slot</div>}
                                        </div>
                                        <button onClick={() => this.showEdit()}>Save</button>
                                        <button onClick={() => this.deleteShip()}>Delete This Ship</button>
                                    </div>
                                    ): <button onClick={() => this.showEdit()}>Edit</button>}
                                </div>
                            </div>
                        ): (<div>Select A Ship</div>)}
                    </div>
            </div> 
        )
    }
}
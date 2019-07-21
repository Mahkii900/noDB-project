import React, {Component} from 'react'

import ShipDesigner from './ShipDesigner'
import ShipSlots from './ShipSlots'

export default class ShipViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: null,
            id: 0,
            showShip: false,
            editing: false,
            adding: false,
            showParts: false,
            didEdit: false,
            shipName: '',
            ship: {},
            hull: {},
            slots: []
        }

        this.addAShip = this.addAShip.bind(this)
        this.cancelSlotChanges = this.cancelSlotChanges.bind(this)
        this.cancelHullChanges = this.cancelHullChanges.bind(this)
        this.didEdit = this.didEdit.bind(this)
    }

    indexFinder(id) {
        this.setState({index: this.props.ships.findIndex(ele => ele.id === id)})
    }

    selectShip(id, name) {
        if (!this.state.editing) {
            this.setState({id: id, showShip: true, shipName: name})
            this.indexFinder(id)
        }
    }

    showAdd() {
        this.setState({adding: !this.state.adding, shipName: ''})
    }

    showEdit() {
        if (!this.state.showEdit) {
            this.setState({ship: this.props.ships[this.state.index], hull: this.props.ships[this.state.index].hull})
        }
        this.setState({editing: !this.state.editing})
        if (this.state.showParts) {
            this.setState({showParts: false})
        }
    }

    inputChangeHandler(e) {
        this.setState({shipName: e.target.value})
    }

    addAShip(name) {
        this.props.addShip(name)
        this.setState({shipName: ''})
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
        this.didEdit()
    }

    didEdit() {
        this.setState({didEdit: true})
    }

    cancelSlotChanges(slots) {
        this.setState({slots: slots})
    }

    cancelHullChanges(hull) {
        this.setState({hull: hull, slots: hull.slots})
    }

    cancelChanges(id) {
        if (this.state.didEdit) {
            let oldShip = {name: this.state.ship.name, hull: this.state.hull}
            for (let i = 0; i < oldShip.hull.slots.length; i++) {
                for(let j = 0; j < this.state.slots.length; j++) {
                    if (oldShip.hull.slots[i].type === this.state.slots[j].type){
                        oldShip.hull.slots[i].name = this.state.slots[j].name
                    }
                }
            }
            this.props.updateShip(id, oldShip)
            this.setState({shipName: this.state.ship.name})
            this.setState({didEdit: false})
        }
        this.showEdit()
    }

    render() {
        return(
            <div className="ship-console">
                    <div className="ship-list">
                        {this.state.adding ? (
                            <div>
                                <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                <button id="add-button" onClick={() => this.addAShip(this.state.shipName)}>Add Ship</button>
                                <button id='add-button' onClick={() => this.showAdd()}>Cancel</button>
                            </div>
                        ): <button onClick={() => this.showAdd()}>Add Ship</button>}
                        <div className='all-ships'>
                            {this.props.ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id, ele.name)}>{ele.name}</li>})}
                        </div>
                    </div>
                    <div className="ship-designing">
                        {this.state.showShip ? (
                            <div className="editing-console">
                                <div className='ship-info'>
                                    <div>
                                        <div className='ship-name'>
                                            {this.props.ships[this.state.index].name}
                                        </div>
                                        {/*Maybe put image here*/}
                                        <div className='ship-slots'>
                                            {this.props.ships[this.state.index].hull.slots.map(ele => {return <li key={ele.name} onClick={() => this.sortParts(ele.type)}>{ele.type}: {ele.name}</li>})}
                                        </div>
                                    </div>
                                    {this.state.editing ? null: <button id='edit-button' onClick={() => this.showEdit()}>Edit {this.props.ships[this.state.index].name}</button>}
                                </div>
                                <div className='edit-ship'>
                                    {this.state.editing ? (
                                        <div className='edit-ship-display'>
                                            <div className='change-name'>Change Ship Name: 
                                                <input type='text' value={this.state.shipName} onChange={(e) => this.inputChangeHandler(e)}/>
                                                <button onClick={() => this.changeShipName(this.state.id, this.state.shipName)}>Change Ship Name</button>
                                            </div>
                                            <div>
                                            <ShipDesigner
                                                hulls={this.props.hulls}
                                                parts={this.props.parts}
                                                getParts={this.props.getParts}
                                                partsType={this.props.partTypes}
                                                updateShip={this.props.updateShip}
                                                shipID={this.props.ships[this.state.index].id}
                                                currentHull={this.props.ships[this.state.index].hull.class}
                                                edit={this.didEdit}
                                                cancelHull={this.cancelHullChanges}
                                                shipHull={this.props.ships[this.state.index].hull}
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
                                                    ship={this.props.ships[this.state.index]}
                                                    saveSlots={this.cancelSlotChanges}
                                                    edit={this.didEdit}
                                                />
                                                </div> : <div>Select A Slot</div>}
                                            </div>
                                            <button onClick={() => this.showEdit()}>Save</button>
                                            <button onClick={() => this.cancelChanges(this.state.ship.id)}>Cancel</button>
                                            <button onClick={() => this.deleteShip()}>Delete This Ship</button>
                                        </div>
                                    ): null}
                                </div>
                            </div>
                        ): (<div className='ship-name'>Select A Ship</div>)}
                    </div>
            </div> 
        )
    }
}
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
            shipImage: '',
            image: '',
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
        let ships = this.props.ships
        this.setState({index: ships.findIndex(ele => ele.id === id)})
    }

    selectShip(id, name) {
        if (!this.state.editing) {
            this.setState({id: id, showShip: true, shipName: name})
            this.indexFinder(id)
        }
    }

    showAdd() {
        this.setState({adding: !this.state.adding, shipName: '', shipImage: ''})
    }

    showEdit() {
        let ships = this.props.ships
        if (!this.state.showEdit) {
            this.setState({ship: ships[this.state.index], hull: ships[this.state.index].hull, image: ships[this.state.index].image})
        }
        this.setState({editing: !this.state.editing})
        if (this.state.showParts) {
            this.setState({showParts: false})
        }
    }

    inputShipNameHandler(e) {
        this.setState({shipName: e.target.value})
    }

    inputShipImageHandler(e) {
        this.setState({shipImage: e.target.value})
    }

    addAShip(name, image) {
        let newShip = {name: name, image: image}
        this.props.addShip(newShip)
        this.setState({shipName: '', shipImage: ''})
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

    changeShipImage(id, image) {
        this.props.updateShip(id, {image: image})
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
        let ship = this.state.ship
        let image = this.state.image
        let hull = this.state.hull
        let slots = this.state.slots
        if (this.state.didEdit) {
            let oldShip = {name: ship.name, hull: hull, image: image}
            for (let i = 0; i < oldShip.hull.slots.length; i++) {
                for(let j = 0; j < slots.length; j++) {
                    if (oldShip.hull.slots[i].type === slots[j].type){
                        oldShip.hull.slots[i].name = slots[j].name
                    }
                }
            }
            this.props.updateShip(id, oldShip)
            this.setState({shipName: ship.name})
            this.setState({didEdit: false})
        }
        this.showEdit()
    }

    render() {
        let shipName = this.state.shipName
        let ships = this.props.ships
        let ship = this.state.ship
        return(
            <div className="ship-console">
                    <div className="ship-list">
                        {this.state.adding ? (
                            <div>
                                <input type='text' value={shipName} placeholder={'Ship Name'} onChange={(e) => this.inputShipNameHandler(e)}/>
                                <input type='text' value={this.state.shipImage} placeholder={'Image URL'} onChange={(e) => this.inputShipImageHandler(e)}/>
                                <button id="add-button" onClick={() => this.addAShip(shipName, this.state.shipImage)}>Add Ship</button>
                                <button id='add-button' onClick={() => this.showAdd()}>Cancel</button>
                            </div>
                        ): <button onClick={() => this.showAdd()}>Add Ship</button>}
                        <div className='all-ships'>
                            {ships.map(ele => {return <li key={ele.id} onClick={() => this.selectShip(ele.id, ele.name)}>{ele.name}</li>})}
                        </div>
                    </div>
                    <div className="ship-designing">
                        {this.state.showShip ? (
                            <div className="editing-console">
                                <div className='ship-info'>
                                    <div>
                                        <div className='ship-name'>
                                            {ships[this.state.index].name}
                                        </div>
                                        <div className='ship-picture'>
                                            <img src={ships[this.state.index].image} alt={ships[this.state.index].name}/>
                                        </div>
                                        <div className='ship-class'>Hull Class: {ships[this.state.index].hull.class}</div>
                                        <div className='ship-slots'>
                                            <div className='ship-equipment-info-title'>
                                                Equipment
                                            </div>
                                            {ships[this.state.index].hull.slots.map(ele => {return <li key={ele.name} onClick={() => this.sortParts(ele.type)}>{ele.type}: {ele.name}</li>})}
                                        </div>
                                    </div>
                                    {this.state.editing ? null: <button id='edit-button' onClick={() => this.showEdit()}>Edit {ships[this.state.index].name}</button>}
                                </div>
                                <div className='edit-ship'>
                                    {this.state.editing ? (
                                        <div className='edit-ship-display'>
                                            <div className='change-name'>Change Ship Name: 
                                                <input type='text' value={shipName} onChange={(e) => this.inputShipNameHandler(e)}/>
                                                <button onClick={() => this.changeShipName(this.state.id, shipName)}>Change Ship Name</button>
                                            </div>
                                            <div className='change-name'>Change Ship Image: 
                                                <input type='text' value={this.state.shipImage} placeholder={'Image URL'} onChange={(e) => this.inputShipImageHandler(e)}/>
                                                <button onClick={() => this.changeShipImage(this.state.id, this.state.shipImage)}>Change Ship Image</button>
                                            </div>
                                            <div className='edit-hull'>
                                                <div className='edit-hull-title'>
                                                    Change Hull Type:
                                                </div>
                                            <ShipDesigner
                                                hulls={this.props.hulls}
                                                parts={this.props.parts}
                                                getParts={this.props.getParts}
                                                partsType={this.props.partTypes}
                                                updateShip={this.props.updateShip}
                                                shipID={ships[this.state.index].id}
                                                currentHull={ships[this.state.index].hull.class}
                                                edit={this.didEdit}
                                                cancelHull={this.cancelHullChanges}
                                                shipHull={ships[this.state.index].hull}
                                            />
                                            </div>
                                            <div className='equipment-parts'>
                                                <div className='equipment-parts-title'>Change Equipment:</div>
                                            {this.state.showParts ? <div className='equipment-parts-list'>
                                                <ShipSlots
                                                    slots={ships[this.state.index].hull.slots}
                                                    hullClass={ships[this.state.index].hull.class}
                                                    partsType={this.props.partTypes}
                                                    updateShip={this.props.updateShip}
                                                    shipID={ships[this.state.index].id}
                                                    ship={ships[this.state.index]}
                                                    saveSlots={this.cancelSlotChanges}
                                                    edit={this.didEdit}
                                                />
                                                </div> : <div className='slot-preview'>{'>>>>Select An Equipment Slot On Left To Change<<<<'}</div>}
                                            </div>
                                            <div className='edit-button-box'>
                                                <button onClick={() => this.showEdit()}>Save Changes</button>
                                                <button onClick={() => this.cancelChanges(ship.id)}>Cancel</button>
                                                <button id='delete-button' onClick={() => this.deleteShip()}>Delete This Ship</button>
                                            </div>
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
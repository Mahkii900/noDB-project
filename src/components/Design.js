import React, {Component} from 'react'

export default class Ship extends Component {
    constructor() {
        super()
        this.state = {
            showParts: false
        }
    }

    partsShowing() {
        this.setState({showParts: true})
    }

    sortParts(type) {
        this.props.getParts(type)
        this.partsShowing()
    }

    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele} onClick={() => this.sortParts(ele)}>{ele}</div>})}
                {this.state.showParts ? this.props.partsType.map(ele => {return <li key={ele.name}>{ele.name}</li>}
                ): <div>Select A Slot</div>}
            </div>
        )
    }
}
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

    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele} onClick={() => this.partsShowing()}>{ele}</div>})}
                {this.state.showParts ? this.props.parts.map(ele => {return <li key={ele}>{ele}</li>}
                ): <div>Select a part</div>}
            </div>
        )
    }
}
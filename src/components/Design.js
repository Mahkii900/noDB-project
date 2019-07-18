import React, {Component} from 'react'

export default class Ship extends Component {
    render() {
        return(
            <div>
                {this.props.slots.map(ele => {return <div key={ele} onClick={() => this.partsShowing()}>{ele}</div>})}
                {this.props.parts.map(ele => {return <li key={ele}>{ele}</li>})}
            </div>
        )
    }
}
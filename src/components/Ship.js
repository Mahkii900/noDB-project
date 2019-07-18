import React, {Component} from 'react'

export default class Ship extends Component {
    render() {
        return(
            <div>
                {this.props.ship}
            </div>
        )
    }
}
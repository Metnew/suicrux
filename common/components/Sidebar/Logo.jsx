import React, {Component} from 'react';
import {Image} from 'semantic-ui-react'

class Logo extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        let url = 'http://react.semantic-ui.com/logo.png'
        return (
            <div className="logo">
                <Image src={url} centered height="34px"/>
            </div>
        )
    }
}

export default Logo

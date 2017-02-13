import React, {Component} from 'react';
import {Image} from 'semantic-ui-react'

class Logo extends Component {
    constructor(props) {
        super(props)
        this.imageURL = 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png'
    }
    render() {
        let url = this.imageURL;
        return (
            <div className="logo">
                <Image src={url} centered height="34px"/>
            </div>
        )
    }
}

export default Logo

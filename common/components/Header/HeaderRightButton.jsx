import React, {Component} from 'react'
import {Icon, Button, Popup} from 'semantic-ui-react'
import './Header.scss'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        onHeaderRightButtonClick: React.PropTypes.func
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        let {onHeaderRightButtonClick} = this.props

        return (
            <Popup trigger={<Button icon onClick = {onHeaderRightButtonClick} basic color = "black" > <Icon name='inbox' size="large"/> </Button>} content="Action with smth."/>
    )}
}

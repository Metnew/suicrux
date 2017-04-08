import React, {PureComponent} from 'react'
import {
    Item,
    Label,
    Divider
} from 'semantic-ui-react'
import DateInboxItemComponent from './DateItemComponent'

export default class InboxItemComponent extends PureComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        date: React.PropTypes.string,
        name: React.PropTypes.string,
        username: React.PropTypes.string,
        address: React.PropTypes.object,
        email: React.PropTypes.string,
        website: React.PropTypes.string,
        phone: React.PropTypes.string,
        item: React.PropTypes.object
    }

    render() {
        let {date, name, username, address, email, website, phone} = this.props

        return (
            <Item className="align-row">
                <DateInboxItemComponent date={date}/>
                <Item.Content>
                    <Item.Header>{name} "{username}"</Item.Header>
                    <Item.Meta>
                        <span>{phone}</span>
                    </Item.Meta>
                    <Item.Description>{address.city} {address.street}</Item.Description>
                    <Item.Extra>
                        <Label>{email}</Label>
                        <Label>{website}</Label>
                    </Item.Extra>
                </Item.Content>
                <Divider horizontal/>
            </Item>
        )
    }
}

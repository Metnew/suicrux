import React, {Component} from 'react';
import {
    Button,
    Icon,
    Item,
    Label,
    Divider
} from 'semantic-ui-react'
import DateInboxItemComponent from './DateItemComponent'

export default class InboxItemComponent extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        item: React.PropTypes.object
    }

    render() {
        let {item} = this.props;

        return (
            <Item className="align-row">
                <DateInboxItemComponent date={item.date}/>
                <Item.Content>
                    <Item.Header>{item.name} "{item.username}"</Item.Header>
                    <Item.Meta>
                        <span>{item.phone}</span>
                    </Item.Meta>
                    <Item.Description>{item.address.city} {item.address.street}</Item.Description>
                    <Item.Extra>
                        <Button primary floated='right' disabled>
                            Edit
                            <Icon name='right chevron'></Icon>
                        </Button>
                        <Label>{item.email}</Label>
                        <Label>{item.website}</Label>
                    </Item.Extra>
                </Item.Content>
                <Divider horizontal/>
            </Item>
        )
    }
}

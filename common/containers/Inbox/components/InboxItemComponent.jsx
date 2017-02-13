import React, {Component} from 'react';
import {
    Button,
    Icon,
    Item,
    Label,
    Divider,
    Segment
} from 'semantic-ui-react'
import {Link} from 'react-router';
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
        let link = '/inbox/' + item.id;
        if (!item.id) {
            item = {
                client: {},
                vacancy: {
                    event: {
                        date: {},
                        city: {}
                    }
                }
            }
        }

        return (
            <Item className="align-row">
                <DateInboxItemComponent date={item.vacancy.event.date}/>
                <Item.Content>
                    <Item.Header as={Link} to={link}>{item.client.name}</Item.Header>
                    <Item.Meta>
                        <span>{item.vacancy.event.city}</span>
                    </Item.Meta>
                    <Item.Description>{item.vacancy.event.city.name}</Item.Description>
                    <Item.Extra>
                        <Button as={Link} to={link} primary floated='right'>
                            Edit
                            <Icon name='right chevron'></Icon>
                        </Button>
                        {/* <Label>{obj.vacancy.event.event_type}</Label> */}
                        <Label>{item.vacancy.event.eventtype}</Label>
                    </Item.Extra>
                </Item.Content>
                <Divider horizontal/>
            </Item>
        )
    }
}

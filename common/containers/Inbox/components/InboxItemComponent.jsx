import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Item, Label, Divider} from 'semantic-ui-react'
import DateInboxItemComponent from './DateItemComponent'

export default class InboxItemComponent extends PureComponent {
  static propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.object,
    email: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    item: PropTypes.object
  }

  render () {
    let {date, name, username, address, email, website, phone} = this.props

    return (
      <Item className="align-row">
        <DateInboxItemComponent date={date} />
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
        <Divider horizontal />
      </Item>
    )
  }
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Image, Button} from 'semantic-ui-react'

export default class DashboardCardComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number
  }

  render () {
    const {title, body, id} = this.props
    return (
      <Card raised>
        <Image alt="Dummy image" src={require('images/dummy.png')} />
        <Card.Content>
          <Card.Header>
            {title}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Post `id` is {id}
            </span>
          </Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' disabled>Approve</Button>
            <Button basic color='red' disabled>Decline</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

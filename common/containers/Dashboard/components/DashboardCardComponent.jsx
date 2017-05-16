import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Card, Image} from 'semantic-ui-react'

export default class DashboardCardComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number
  }

  render () {
    let {title, body, id, userId} = this.props

    return (
      <Card raised>
          <Image alt="Dummy image" src="./images/dummy.png" />
        <Card.Content>
          <Card.Header>
            {title}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Post's "id" is {id}
            </span>
          </Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            User's id is "{userId}"
          </a>
        </Card.Content>
      </Card>
    )
  }
}

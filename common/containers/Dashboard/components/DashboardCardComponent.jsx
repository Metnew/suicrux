import React, {PureComponent} from 'react';
import {Card, Image} from 'semantic-ui-react'

export default class DashboardCardComponent extends PureComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        title: React.PropTypes.string,
        body: React.PropTypes.string,
        userId: React.PropTypes.number,
        id: React.PropTypes.number
    }

    render() {
        let {title, body, id, userId} = this.props

        return (
            <Card raised>
                <Image src='http://react.semantic-ui.com/assets/images/wireframe/image.png'/>
                <Card.Content>
                    <Card.Header>
                        {title}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
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
            </Card>)
    }

}

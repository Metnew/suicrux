import React, {PureComponent} from 'react';
import {Loader, Item, Grid} from 'semantic-ui-react'
import InboxItemComponent from './InboxItemComponent';

export default class InboxComponent extends PureComponent {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        conversations: React.PropTypes.array
    }

    render() {
        let {conversations} = this.props
        let noConversations = !conversations || conversations.length == 0

        return (
            <div>
                {noConversations && <Loader active={true}>Loading...</Loader>}
                <Grid stackable>
                    <Grid.Column width={16}>
                        {!noConversations && <Item.Group divided>
                            {conversations.map((obj, i) => {
                                return (<InboxItemComponent key={i} {...obj}/>)
                            })}
                        </Item.Group>}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

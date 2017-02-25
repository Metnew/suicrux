import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Loader,
    Item,
    Grid
} from 'semantic-ui-react'
import {GET_INBOX} from 'actions/inbox';
import InboxItemComponent from './components/InboxItemComponent';
import './Inbox.scss';

@connect(mapStateToProps, mapDispatchToProps)
export default class Inbox extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        conversations: React.PropTypes.array,
        getConversations: React.PropTypes.func,
        isMobile: React.PropTypes.bool
    }

    componentDidMount() {
        this.props.getConversations()
    }

    render() {
        let {conversations} = this.props;
        let noConversations = !conversations || conversations.length == 0
        return (
            <Grid reversed="mobile vertically" stackable className="inbox-list-container">
                <Grid.Column width={16}>
                    {!noConversations
                        ? <Item.Group divided>
                                {conversations.map((obj, i) => {
                                    return (<InboxItemComponent key={i} item={obj}/>)
                                })}
                            </Item.Group>
                        : <Loader active={true}>Loading...</Loader> }
                </Grid.Column>
            </Grid>

        )
    }
}

function mapStateToProps(state) {
    return {
        conversations: state.inbox.conversations,
        isMobile: state.layout.isMobile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getConversations: async() => {
            let result = await dispatch(GET_INBOX())
            dispatch(result)
        }
    }
}

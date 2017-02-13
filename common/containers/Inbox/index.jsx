import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    // Button,
    Icon,
    Loader,
    Item,
    Menu,
    Header,
    // Label,
    // Divider,
    Grid,
    Input
} from 'semantic-ui-react'
// import {Link} from 'react-router';
import {GET_INBOX} from 'actions/inbox';
import InboxItemComponent from './components/InboxItemComponent';
import InboxRightSidebarComponent from './components/InboxRightSidebarComponent';
import _ from 'lodash';
require('./Inbox.scss');

@connect(mapStateToProps, mapDispatchToProps)
export default class Inbox extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isDataLoading: true,
        activeItemFilter: 'All'
    }

    static propTypes = {
        conversations: React.PropTypes.array,
        getConversations: React.PropTypes.func,
        isDataLoading: React.PropTypes.bool,
        isMobile: React.PropTypes.bool
    }

    componentDidMount() {
        this.props.getConversations()
    }

    sendStateToParent(rightSidebarState) {
        console.log(rightSidebarState)
    }

    render() {
        let {conversations} = this.props;
        let {activeItemFilter} = this.state;
        conversations = _.values(conversations)
        let noConversations = conversations === null;
        let conversations_components = ''
        if (!noConversations) {
            console.log(conversations)
            conversations_components = conversations.map((obj, i) => {
                return (<InboxItemComponent key={i} item={obj}/>)
            })
        }
        return (
            <Grid reversed="mobile vertically" stackable className="inbox-list-container">
                <Grid.Column width={12}>
                    {/* BUG: use isDataLoading for handling noConversations and loaded state. */}
                    {!noConversations
                        ? <Item.Group divided>
                                {conversations_components}
                            </Item.Group>
                        : <Loader active={true}>Loading...</Loader>}
                    {/* {noConversations && <div>You have no conversations, man :(</div>} */}

                </Grid.Column>
                <Grid.Column width={4}>
                    <InboxRightSidebarComponent sendStateToParent={this.sendStateToParent}/>
                </Grid.Column>
            </Grid>

        )
    }
}

function mapStateToProps(state) {
    const {activeItemFilter} = state.inbox
    // here must be filtering !!
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
        },
        filterConversationsInbox: () => {
            dispatch()
        }
    }
}

//
//
// {
//     Inbox: {
//         "search1": ["hello", "привет", "HALO"],
//         "search2": [null, "привет", "HALO"]
//     }
// }

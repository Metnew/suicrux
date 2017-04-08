import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GET_INBOX} from 'actions/inbox';
import InboxComponent from './components/InboxComponent'
import './Inbox.scss';

class Inbox extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        conversations: React.PropTypes.array,
        getConversations: React.PropTypes.func
    }

    componentDidMount() {
        this.props.getConversations()
    }

    render() {
        let {conversations} = this.props
        let props = {conversations}
        return (
            <InboxComponent {...props} />
        )
    }
}

function mapStateToProps(state) {
    return {conversations: state.inbox.conversations}
}

function mapDispatchToProps(dispatch) {
    return {
        getConversations: async() => {
            let result = await dispatch(GET_INBOX)
            dispatch(result)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Statistic} from 'semantic-ui-react'
import {GET_STATISTICS} from 'actions/dashboard'

@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        notifications: React.PropTypes.array,
        statistics: React.PropTypes.array,
        profile: React.PropTypes.object,
        getNotifications: React.PropTypes.func,
        getStatistics: React.PropTypes.func,
        getProfile: React.PropTypes.func
    }

    componentWillMount() {
        this.props.getStatistics()
    }

    render() {

        let {statistics} = this.props
        let statistic_components
        if (statistics) {
            statistic_components = statistics.map((obj, i) => {
                return <Statistic value={obj.value} label={obj.label} key={i}/>
            })
        }

        return (
            <div>
                <h3>Dashboard</h3>
                {statistic_components}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {statistics: state.dashboard.statistics}
}

function mapDispatchToProps(dispatch) {
    return {
        getStatistics: async() => {
            let result = await dispatch(GET_STATISTICS())
            dispatch(result)
        }
    }
}

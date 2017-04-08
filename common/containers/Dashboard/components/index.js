import React, {Component} from 'react'
import {Card, Loader} from 'semantic-ui-react'
import DashboardCardComponent from './DashboardCardComponent'
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        statistics: React.PropTypes.array
    }

    render() {
        let {statistics} = this.props

        return (
            <div>
                {statistics.length === 0 && <Loader active={true}>Loading...</Loader>}
                {statistics && <Card.Group>
                    {statistics.map((stats, i) => <DashboardCardComponent {...stats} key={i}/>)}
                </Card.Group>}
            </div>
        )
    }
}

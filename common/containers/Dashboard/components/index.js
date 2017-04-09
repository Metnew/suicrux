import React, {Component} from 'react'
import {Card, Loader, Grid} from 'semantic-ui-react'
import DashboardCardComponent from './DashboardCardComponent'
export default class DashboardComponent extends Component {
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
                <Grid columns={1}>
                    <Grid.Row centered>
                        <Grid.Column width={16}>
                            {statistics && <Card.Group itemsPerRow={2} doubling>
                                {statistics.map((stats, i) => <DashboardCardComponent {...stats} key={i}/>)}
                            </Card.Group>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

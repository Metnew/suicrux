import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import './Footer.scss'
export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <footer>
                <div className="footer-inner">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}></Grid.Column>
                            <Grid.Column width={4}>
                                <h3>Reatty</h3>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </footer>
        )
    }
}

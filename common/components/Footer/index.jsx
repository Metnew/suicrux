import React, {Component} from 'react';
import {Grid, Image, Icon, Container} from 'semantic-ui-react';
require('./Footer.scss')
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
                                <Container>
                                    <Icon name='facebook square' size="big"/>
                                    <Icon name='twitter square' size="big"/>
                                    <Icon name='pinterest square' size="big"/>
                                    <Icon name='instagram' size="big"/>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </footer>
        )
    }
}

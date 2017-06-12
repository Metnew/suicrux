import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {Grid, Header, Icon} from 'semantic-ui-react'
import './Footer.scss'

export default class Footer extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <footer>
          <div className="footer-inner">
              <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <a href="https://github.com/Metnew/react-semantic.ui-starter">
                  <Header as="h3" inverted>
                    <Icon name="github" />
                    <Header.Content>
                      React-Semantic.UI-Start
                      <Header.Subheader>
                        Cash me on @Github howbow dah?
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </footer>
    )
  }
}

/**
 * @flow
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {Grid, Header, Icon} from 'semantic-ui-react'
import {StyledFooter, StyledFooterInner} from './style'

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterInner>
				<Grid relaxed>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={12} mobile={16}>
							<a href="https://github.com/Metnew/react-semantic.ui-starter">
								<Header as="h3" inverted>
									<Icon name="github" />
									<Header.Content>
										Noir
										<Header.Subheader>
											Semantic.UI is cool, really.
										</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</StyledFooterInner>
		</StyledFooter>
	)
}

export default Footer

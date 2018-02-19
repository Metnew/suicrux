/**
 * @flow
 */
import React from 'react'
import {Grid, Header, Icon} from 'semantic-ui-react'
import {StyledFooter} from './style'

const Footer = () => {
	return (
		<StyledFooter>
			<div className="footer-inner">
				<Grid relaxed>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={12} mobile={16}>
							<a href="https://github.com/Metnew/suicrux">
								<Header as="h3" inverted>
									<Icon name="github" />
									<Header.Content>
										Suicrux
										<Header.Subheader>
											Best carefully selected libs ❤️
										</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</StyledFooter>
	)
}

export default Footer

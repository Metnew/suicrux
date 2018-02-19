/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Loader, Grid, List} from 'semantic-ui-react'
import {GET_LINKS} from 'actions/links'
import LinkItem from './components/LinkItem'
import {getEntitiesLinksState, isLoaded} from 'selectors'
import _ from 'lodash'

type Props = {
	links: Object,
	getLinks: () => void,
	isLinksLoaded: boolean
}

class Links extends Component<Props> {
	componentDidMount () {
		if (!this.props.isLinksLoaded) {
			this.props.getLinks()
		}
	}

	async asyncBootstrap () {
		if (!this.props.isLinksLoaded) {
			await this.props.getLinks()
		}
		return true
	}

	render () {
		const {links, isLinksLoaded} = this.props
		return (
			<div>
				<Helmet>
					<title>Suicrux:Links</title>
				</Helmet>
				{!isLinksLoaded ? (
					<Loader active>Loading data...</Loader>
				) : (
					<Grid stackable>
						<Grid.Column width={16}>
							<List relaxed divided animated>
								{_.map(links, (linkItem, i) => {
									return <LinkItem key={i} {...linkItem} />
								})}
							</List>
						</Grid.Column>
					</Grid>
				)}
			</div>
		)
	}
}

function mapStateToProps (state) {
	const linksState = getEntitiesLinksState(state)
	const links = linksState.entities
	const isLinksLoaded = isLoaded(linksState)
	return {links, isLinksLoaded}
}

const mapDispatchToProps = dispatch => ({
	async getLinks () {
		return dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

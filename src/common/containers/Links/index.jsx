/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Loader, Grid, List} from 'semantic-ui-react'
import {GET_LINKS} from 'actions/links'
import LinkItem from './components/LinkItem'
import {getEntitiesLinksState} from 'selectors'
import _ from 'lodash'
import type {GlobalState} from 'reducers'

type Props = {
	links: Object,
	getLinks: () => void,
	isLinksLoading: boolean,
	isLinksLoaded: boolean
}

class Links extends Component {
	props: Props

	async asyncBootstrap () {
		const {isLinksLoaded, getLinks} = this.props
		if (!isLinksLoaded) {
			await getLinks()
		}
		return true
	}

	componentDidMount () {
		const {isLinksLoaded, getLinks} = this.props
		if (!isLinksLoaded) {
			getLinks()
		}
	}

	render () {
		const {links, isLinksLoading} = this.props
		return (
			<div>
				<Helmet>
					<title>Suicrux:Links</title>
				</Helmet>
				{isLinksLoading ? (
					<Loader active>Loading data...</Loader>
				) : (
					<Grid stackable>
						<Grid.Column width={16}>
							<List relaxed divided animated>
								{_.map(links, (link: LinkItem, i) => {
									return <LinkItem key={i} item={link} />
								})}
							</List>
						</Grid.Column>
					</Grid>
				)}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const linksState = getEntitiesLinksState(state)
	const links = linksState.entities
	const isLinksLoading = linksState.fetchStatus === 'loading'
	const isLinksLoaded = linksState.fetchStatus === 'loaded'
	return {links, isLinksLoading, isLinksLoaded}
}

const mapDispatchToProps = dispatch => ({
	async getLinks () {
		return dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

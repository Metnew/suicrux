/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Loader, Grid, List} from 'semantic-ui-react'
import {GET_LINKS} from 'actions/links'
import LinkItem from './components/LinkItem'
<<<<<<< HEAD
import {getEntitiesLinksState} from 'selectors'
import _ from 'lodash'
import type {GlobalState} from 'reducers'
=======
import {getEntitiesLinksState, isLoaded} from 'selectors'
import _ from 'lodash'
>>>>>>> feat/3.0-release

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
<<<<<<< HEAD
								{_.map(links, (link: LinkItem, i) => {
									return <LinkItem key={i} item={link} />
=======
								{_.map(links, (linkItem, i) => {
									return <LinkItem key={i} {...linkItem} />
>>>>>>> feat/3.0-release
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
<<<<<<< HEAD
	const isLinksLoading = linksState.fetchStatus === 'loading'
	const isLinksLoaded = linksState.fetchStatus === 'loaded'
	return {links, isLinksLoading, isLinksLoaded}
=======
	const isLinksLoaded = isLoaded(linksState)
	return {links, isLinksLoaded}
>>>>>>> feat/3.0-release
}

const mapDispatchToProps = dispatch => ({
	async getLinks () {
		return dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Loader} from 'semantic-ui-react'
import {GET_LINKS} from 'actions/links'
import LinksComponent from './components'
import {getEntitiesLinksState} from 'selectors'
import type {GlobalState} from 'reducers'

type Props = {
	links: Object,
	getLinks: () => void,
	isLinksLoaded: boolean,
	isLinksLoading: boolean,
}

class Links extends Component {
	props: Props
	componentDidMount () {
		this.getLinks()
	}

	getLinks () {
		this.props.getLinks()
	}

	render () {
		const {links, isLinksLoaded} = this.props
		return (
			<div>
				<Helmet>
					<title>Noir:Links</title>
				</Helmet>
				{isLinksLoaded
					? <LinksComponent links={links} />
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const linksState = getEntitiesLinksState(state)
	const links = linksState.entities
	const isLinksLoaded = linksState.isLoaded
	const isLinksLoading = linksState.isLoading

	return {links, isLinksLoaded, isLinksLoading}
}

const mapDispatchToProps = dispatch => ({
	getLinks () {
		dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

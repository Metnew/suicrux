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
	isLinksLoading: boolean,
	isLinksLoaded: boolean
}

class Links extends Component {
	props: Props

	componentDidMount () {
		const {isLinksLoaded} = this.props
		if (!isLinksLoaded) {
			this.getLinks()
		}
	}

	getLinks () {
		this.props.getLinks()
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
					<LinksComponent links={links} />
				)}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const linksState = getEntitiesLinksState(state)
	const links = linksState.entities
	const isLinksLoading = linksState.isLoading
	const isLinksLoaded = linksState.isLoaded
	return {links, isLinksLoading, isLinksLoaded}
}

const mapDispatchToProps = dispatch => ({
	getLinks () {
		dispatch(GET_LINKS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)

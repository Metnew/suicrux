// @flow
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Loader} from 'semantic-ui-react'
import _ from 'lodash'
/**
 * @desc small addon that allows you to lazy load some parts of your app
 * Primarly routes (e.g. Route + RouteAuth)
 */

type Props = {
	component: any
}

type State = {
	componentLoaded: boolean,
	componentToRender: null | Function
}

class LazyLoad extends Component {
	props: Props
	state: State = {
		componentLoaded: false,
		componentToRender: null
	}

	componentWillMount () {
		this.load()
	}

	async load () {
		const {component} = this.props
		const componentToRender = await component()
		this.setState({
			componentLoaded: true,
			componentToRender: componentToRender.default
		})
	}

	render () {
		const {componentLoaded} = this.state

		console.log(
			`Component loaded and ready to be mounted: ${componentLoaded
				? 'YES'
				: 'NO'}`
		)

		if (componentLoaded) {
			const props = _.omit(this.props, ['component'])
			const LoadedComponent = this.state.componentToRender
			return <LoadedComponent {...props} />
		} else {
			return <Loader>Loading...</Loader>
		}
	}
}

export default LazyLoad

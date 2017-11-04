import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import RouteAuth from 'components/addons/RouteAuth'
import {shallow} from 'enzyme'
import {getRouterRoutes} from 'routing'

const accessToInboxOnly = path => {
	return path === '/inbox'
}
const accessExceptInbox = path => {
	return path !== '/inbox'
}

const sampleRouteItem = getRouterRoutes()[0]

describe('RouteAuth component', () => {
	it("creates <Redirect /> if user doesn't have access", () => {
		const gotRedirect = {
			...sampleRouteItem,
			canAccess: accessExceptInbox,
			path: '/inbox'
		}
		const component = shallow(<RouteAuth {...gotRedirect} />)
		expect(component.equals(<Redirect to="/auth" />)).toBe(true)
	})

	it('creates <Route /> if user has access', () => {
		const gotComponent = {
			...sampleRouteItem,
			canAccess: accessToInboxOnly,
			path: '/inbox'
		}
		const component = shallow(<RouteAuth {...gotComponent} />)
		expect(component.equals(<Route {...gotComponent} />)).toBe(true)
	})
})

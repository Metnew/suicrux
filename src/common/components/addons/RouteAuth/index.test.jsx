import React from 'react'
import RouteAuth from 'components/addons/RouteAuth'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {routes as routing} from 'routing'

const accessToInboxOnly = path => {
	return path === '/inbox'
}
const accessExceptInbox = path => {
	return path !== '/inbox'
}

const sampleRouteItem = routing.filter(a => a.component && a.tag)[0]

describe('RouteAuth component', () => {
	// it('creates <Redirect /> if user dont have access', done => {
	// 	const gotRedirect = {
	// 		...sampleRouteItem,
	// 		canAccess: accessExceptInbox,
	// 		path: '/inbox'
	// 	}
	// 	const component = shallow(<RouteAuth {...gotRedirect} />)
	// 	done()
	// })
	//
	// it('creates component if user have access', done => {
	// 	const gotComponent = {
	// 		...sampleRouteItem,
	// 		canAccess: accessToInboxOnly,
	// 		path: '/inbox'
	// 	}
	// 	const component = shallow(<RouteAuth {...gotComponent} />)
	// 	console.log(component)
	// 	done()
	// })
})

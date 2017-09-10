import React from 'react'
import RouteAuth from 'components/addons/RouteAuth'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

const props = {
	path: '/',
	canAccess: () => ({})
}

const notInboxPath = '/auth'
const inboxPath = '/inbox'
const accessToInboxOnly = path => {
	return path === '/inbox'
}
const accessExceptInbox = path => {
	return path !== '/inbox'
}

describe('RouteAuth component', () => {
  it('creates <Redirect /> if user dont have access', done => {

  })

  it('creates component if user have access', done => {

  })
	const gotRedirect = {
		path: inboxPath,
		canAccess: accessExceptInbox
	}
	const component = shallow(<RouteAuth {...gotRedirect} />)
})

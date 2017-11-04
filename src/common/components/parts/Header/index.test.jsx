import React from 'react'
import Header from 'components/parts/Header'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

const props = {
	title: 'Dashboard',
	toggleSidebar: () => ({}),
	isLoggedIn: true,
	isMobile: false
}

describe('Header component', () => {
	it('same snapshot at Dashboard on non-mobile screen', () => {
		const component = shallow(<Header {...props} />)
		expect(toJson(component)).toMatchSnapshot()
	})
})

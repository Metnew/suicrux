import React from 'react'
import Sidebar from 'components/parts/Sidebar'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {routes as routing} from 'routing'

const props = {
	isMobile: true,
	logout: () => ({}),
	routing,
	open: true
}

describe('Sidebar component', () => {
	it('same snapshot if Sidebar is open and it is on mobile screen', () => {
		const component = shallow(<Sidebar {...props} />)
		expect(toJson(component)).toMatchSnapshot()
	})
})

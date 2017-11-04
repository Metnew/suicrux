import React from 'react'
import Sidebar from 'components/parts/Sidebar'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {getSidebarRoutes} from 'routing'

const props = {
	isMobile: true,
	logout: () => ({}),
	routing: getSidebarRoutes(),
	open: true
}

describe('Sidebar component', () => {
	it('same snapshot for Sidebar', () => {
		const component = shallow(<Sidebar {...props} />)
		expect(toJson(component)).toMatchSnapshot()
	})
})

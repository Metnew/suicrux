import React from 'react'
import Logo from 'components/elements/Logo'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

const props = {
	centered: true,
	shape: 'circular'
}

describe('Logo component', () => {
	it('same snapshot', () => {
		const component = shallow(<Logo {...props} />)
		expect(toJson(component)).toMatchSnapshot()
	})
})

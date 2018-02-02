import React from 'react'
import Footer from 'components/Footer'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

describe('Footer component', () => {
	it('same snapshot', () => {
		const component = shallow(<Footer />)
		expect(toJson(component)).toMatchSnapshot()
	})
})

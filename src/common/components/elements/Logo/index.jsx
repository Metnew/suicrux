// @flow
import React from 'react'
import {Image as ImageComponent} from 'semantic-ui-react'

type Props = {
	shape: string, // | 'circular'
	centered: boolean
}

const Logo = (props: Props) => {
	const logoImg = require('images/Logo.png')
	return <ImageComponent src={logoImg} {...props} />
}

export default Logo

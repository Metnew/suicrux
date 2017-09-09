/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import i18n from '../locals'
import manifest from '../static/manifest'

let {
	BASE_API,
	NODE_ENV,
	SENTRY_DSN_PUBLIC,
	GA_ID,
	JWT_SECRET,
	SENTRY_DSN,
	PORT
} = process.env

// Vars for both server and frontend
BASE_API = BASE_API || '/api/v1'
NODE_ENV = NODE_ENV || 'development'

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

// Vars for server only
const CLIENT_DIST_PATH = path.join(distPath, './client')
JWT_SECRET = JWT_SECRET || 'secret'
PORT = PORT || 3000

// compute isProduction based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'

export default {
	title: 'Noir',
	publicPath: '/',
	// i18n object
	i18n,
	isProduction,
	// Env vars
	BASE_API,
	NODE_ENV,
	SENTRY_DSN_PUBLIC,
	GA_ID,
	CLIENT_DIST_PATH,
	JWT_SECRET,
	SENTRY_DSN,
	PORT,
	// It's better to define pathes in one file
	// and then use everywhere across app
	srcPath,
	srcCommonPath,
	distPath,
	rootPath,
	// text for WebpackBannerPlugin
	banner:
		'Apache 2 License. Copyright (c) 2017 Vladimir Metnew All Rights Reserved. Repo: https://github.com/Metnew/noir',
	// your manifest.json
	manifest,
	vendor: [
		'react',
		'react-dom',
		'redux',
		'history',
		'react-router',
		'react-router-dom',
		'react-router-redux',
		'semantic-ui-react',
		'redux-thunk',
		'react-helmet',
		'lodash',
		'normalizr',
		'js-cookie',
		'prop-types',
		'store2',
		'styled-components'
	],
	polyfills: ['promise-polyfill', 'isomorphic-fetch']
}

/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import i18n from '../i18n'
import manifest from './assets/manifest'

let {
	BASE_API,
	APP_LANGUAGE,
	NODE_ENV,
	SENTRY_DSN_PUBLIC,
	GA_ID,
	JWT_SECRET,
	DIST_PATH,
	SENTRY_DSN,
	PORT
} = process.env

// Vars for both server and frontend
BASE_API = BASE_API || '/api/v1'
APP_LANGUAGE = APP_LANGUAGE || 'en'
NODE_ENV = NODE_ENV || 'development'

// Vars for frontend only

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

// Vars for server only
DIST_PATH = DIST_PATH || path.join(distPath, './client', APP_LANGUAGE)
JWT_SECRET = JWT_SECRET || 'secret'
PORT = PORT || 4000

export default {
	title: 'React-Semantic.UI-Starter',
	publicPath: '/',
	// i18n object
	i18n,
	// Env vars
	BASE_API,
	APP_LANGUAGE,
	NODE_ENV,
	SENTRY_DSN_PUBLIC,
	GA_ID,
	DIST_PATH,
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
		'MIT License. Copyright (c) 2017 Vladimir Metnew All Rights Reserved. Repo: https://github.com/Metnew/react-semantic.ui-starter',
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

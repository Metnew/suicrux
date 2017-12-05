/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import manifest from '../static/manifest'

const {
	BASE_API = '/api/v1',
	NODE_ENV = 'development',
	SENTRY_PUBLIC_DSN,
	GA_ID,
	JWT_SECRET = 'secret',
	ANALYZE_BUNDLE,
	SENTRY_DSN,
	PORT = 3000
} = process.env

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

// Vars for server only
const CLIENT_DIST_PATH = path.join(distPath, './client') // = "/dist/client"

// compute isProduction based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'

export default {
	title: 'Suicrux',
	publicPath: '/',
	// i18n object
	isProduction,
	// Env vars
	BASE_API,
	API_PREFIX: BASE_API,
	BASE_API_SSR: `http://localhost:${PORT}${BASE_API}`,
	NODE_ENV,
	SENTRY_PUBLIC_DSN,
	ANALYZE_BUNDLE,
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
		'Apache 2 License. Copyright (c) 2017 Vladimir Metnew All Rights Reserved. Repo: https://github.com/Metnew/suicrux',
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
		'js-cookie',
		'store2',
		'styled-components',
		'react-headroom'
	],
	polyfills: ['isomorphic-fetch']
}

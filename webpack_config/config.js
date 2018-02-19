/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import manifest from '../static/manifest'

const {
	NODE_ENV = 'development',
	SENTRY_PUBLIC_DSN,
	GA_ID,
	ANALYZE_BUNDLE,
	SENTRY_DSN,
	PORT = 3000,
	HOST = 'localhost',
	INSPECT_ENABLED = true
} = process.env

// compute isProduction based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'
const DEV_SERVER_PORT = +PORT + 1

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"
const publicPath = !isProduction ? `http://localhost:${PORT}/` : '/'

// Vars for server only
const CLIENT_STATIC_PATH = path.join(distPath, './client') // = "/dist/client"
const CLIENT_ASSETS_MANIFEST = path.join(CLIENT_STATIC_PATH, './webpack-assets.json')

export default {
	isProduction,
	// Env vars
	NODE_ENV,
	SENTRY_PUBLIC_DSN,
	ANALYZE_BUNDLE,
	GA_ID,
	CLIENT_STATIC_PATH,
	CLIENT_ASSETS_MANIFEST,
	SENTRY_DSN,
	PORT,
	HOST,
	INSPECT_ENABLED,
	// Client's webpack-dev-server port
	DEV_SERVER_PORT,
	// Paths
	srcPath,
	srcCommonPath,
	distPath,
	rootPath,
	publicPath,
	// text for WebpackBannerPlugin
	banner: 'Apache 2 License. Copyright (c) 2018 Vladimir Metnew. Repo: https://github.com/Metnew/suicrux',
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
		// 'semantic-ui-react',
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

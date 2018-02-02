/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

const path = require('path')
const manifest = require('../public/manifest')

const {
	NODE_ENV = 'development',
	SENTRY_PUBLIC_DSN,
	GA_ID,
	ANALYZE_BUNDLE,
	SENTRY_DSN,
	PORT = 3000
} = process.env

// Paths
const rootPath = path.join(__dirname, '..') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

// compute isProduction based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	title: 'Suicrux',
	publicPath: '/',
	// i18n object
	isProduction,
	// Env vars
	NODE_ENV,
	SENTRY_PUBLIC_DSN,
	ANALYZE_BUNDLE,
	GA_ID,
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
		'Apache-2.0 License. Copyright (c) 2018 Vladimir Metnew https://github.com/Metnew/suicrux',
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
		'styled-components',
		'react-headroom'
	],
	polyfills: ['isomorphic-fetch']
}

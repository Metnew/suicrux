/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'
import i18n from '../i18n'
import manifest from './assets/manifest'

function ternary (a, b) {
	return a ? a : b
}

// Vars for both server and frontend
const BASE_API = ternary(process.env.BASE_API, '/api/v1')
const APP_LANGUAGE = ternary(process.env.APP_LANGUAGE, 'en')
const NODE_ENV = ternary(process.env.NODE_ENV, 'development')

// Vars for frontend only
const SENTRY_DSN_PUBLIC = ternary(process.env.SENTRY_DSN_PUBLIC)
const GA_ID = ternary(process.env.GA_ID)

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

// Vars for server only
const DIST_PATH = ternary(process.env.DIST_PATH, path.join(distPath, './client', APP_LANGUAGE))
const JWT_SECRET = ternary(process.env.JWT_SECRET, 'secret')
const SENTRY_DSN = ternary(process.env.SENTRY_DSN)
const PORT = ternary(process.env.PORT, 4000)


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
	manifest
}

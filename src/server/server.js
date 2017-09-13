/*
 * @flow
 */
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'
import fetch from 'isomorphic-fetch'

global.fetch = fetch
global.window = {}

/**
 * Mount API, SSR and middlewares to app.
 * @param  {express$Application} app - Express server instance
 * @return {express$Application}     - Decorated server instance
 */
export default (app: express$Application): express$Application => {
	// Add global middlewares
	addMiddlewares(app)
	// Add API
	app.use(process.env.BASE_API, API)
	// Add SSR
	app.use(SSR)
	return app
}

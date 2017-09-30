import path from 'path'
import {readFileSync} from 'fs'
// If you want quick SSL for prototyping:
// NOTE: you should use own SSL certs in production!
let key = ''
let cert = ''


if (process.env.NODE_ENV === 'development') {
	// REMOVE THESE LINES IF YOU HAVE VALID CERT AND KEY FOR DEVELOPMENT
	const pseudossl = require('pseudossl')
	key = pseudossl.key
	cert = pseudossl.cert
} else {
	key = readFileSync(path.join(__dirname, './ssl/server.key'))
	cert = readFileSync(path.join(__dirname, './ssl/server.crt'))
}

export const serverOptions = {
	key,
	cert
}

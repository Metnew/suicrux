import path from 'path'
import {readFileSync} from 'fs'
// If you want quick SSL for prototyping:
// import pseudossl from 'pseudossl'

export const serverOptions = {
	key: readFileSync(path.join(__dirname, './ssl/server.key')),
	cert: readFileSync(path.join(__dirname, './ssl/server.crt'))
}

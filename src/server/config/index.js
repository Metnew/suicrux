import path from 'path'
import {readFileSync} from 'fs'

export const serverOptions = {
	key: readFileSync(path.join(__dirname, 'ssl/server.key')),
	cert: readFileSync(path.join(__dirname, 'ssl/server.crt'))
}

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

global.fetch = require('isomorphic-fetch')
process.env.BROWSER = false

const adapter = new Adapter()
configure({adapter})

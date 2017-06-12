import baseConfig from './base'

let config = {
  BASE_API: 'http://localhost:4000/api/v1' /// your base api for XHR
}

export default Object.freeze(Object.assign({}, baseConfig, config))

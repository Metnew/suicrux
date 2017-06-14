'use strict'
const chalk = require('chalk')

// Just print APP is running, after every compilation
module.exports = class LogPlugin {
  constructor (port) {
    this.port = port
  }

  apply (compiler) {
    compiler.plugin('done', () => {
      const url = `http://localhost:${this.port}`
      console.log(
        `> App is running at ${chalk.yellow(url)}\n`
      )
    })
  }
}

import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'

class Logo extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    let url = './images/logo.png'
    return (
      <div className="logo">
        <Image src={url} centered height="34px" />
      </div>
    )
  }
}

export default Logo

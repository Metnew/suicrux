import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Statistic} from 'semantic-ui-react'

export default class DateItemComponent extends PureComponent {
  static propTypes = {
    date: PropTypes.string
  }

  render () {
    let {date} = this.props
    if (!date) {
      date = '1900-01-01'
    }
    const dateStr = date.split('-')
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const monthIndex = Number(dateStr[1]) - 1
    const monthString = monthNames[monthIndex]
    const year = dateStr[0]
    const day = dateStr[2]

    return (
      <Statistic floated="left" value={day} label={`${monthString}, ${year}`} />
    )
  }
}

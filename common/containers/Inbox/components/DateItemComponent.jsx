import React, {Component} from 'react';
import {Statistic} from 'semantic-ui-react'

export default class DateItemComponent extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        date: React.PropTypes.string
    }

    render() {
        const {date} = this.props
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
        ];
        const monthIndex = Number(dateStr[1]) - 1
        const monthString = monthNames[monthIndex]
        const year = dateStr[0]
        const day = dateStr[2]

        return (<Statistic floated='left' value={day} label={`${monthString}, ${year}`}/>)
    }

}

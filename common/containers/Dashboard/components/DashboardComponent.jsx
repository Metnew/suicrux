import React from 'react'
import {Component} from 'react'
//Components
import { Statistic } from 'semantic-ui-react'

export default class DashboardComponent extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		notifications: React.PropTypes.array,
		statistics: React.PropTypes.array
	}

    render() {
        return (
            <div>
                <Statistic value='5,500' label='Downloads' />
            </div>
            )
    }

    
}



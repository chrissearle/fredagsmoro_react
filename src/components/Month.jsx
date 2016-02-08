import React from 'react'
import {Map} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'
import {Date} from './Date'

import {monthArchiveTitle} from '../helpers'

export class Month extends PureRenderComponent {

    getMonth() {
        return this.props.month.get('name')
    }

    getTitle() {
        return monthArchiveTitle(parseInt(this.getMonth()) - 1)
    }

    getYear() {
        return this.props.year
    }

    getTree() {
        return this.props.month.get('tree').sortBy(date => date.get('name'))
    }

    render() {
        const spacers = []

        const missing = 5 - this.getTree().size

        for (let i = 0; i < missing; i++) {
            spacers.push(<td key={`spacer:${i}`}/>)
        }

        return <tr>
            <th>{this.getTitle()}</th>
            {this.getTree().map(date =>
                <Date key={`Date:${date.get('name')}`} date={date} month={this.getMonth()} year={this.getYear()}/>
            )}
            {spacers}
        </tr>
    }
}

Month.propTypes = {
    year: React.PropTypes.string.isRequired,
    month: React.PropTypes.instanceOf(Map).isRequired
}
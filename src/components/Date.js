import React from 'react'
import {Link} from 'react-router'
import {Map} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

import {dateArchiveTitle} from '../helpers'

export class Date extends PureRenderComponent {
    getDate() {
        return this.props.date.get('name')
    }

    getTitle() {
        return dateArchiveTitle(parseInt(this.getDate()))
    }

    getYear() {
        return this.props.year
    }

    getMonth() {
        return this.props.month
    }

    getCount() {
        return this.props.date.get('tree').size
    }

    render() {
        return <td>
            <Link to={`/${this.getYear()}/${this.getMonth()}/${this.getDate()}/`}>
                {this.getTitle()}
            </Link>
            &nbsp;
            -
            &nbsp;
            <span className="badge">
                {this.getCount()} images
            </span>
        </td>
    }
}

Date.propTypes = {
    date: React.PropTypes.instanceOf(Map).isRequired,
    month: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired
}
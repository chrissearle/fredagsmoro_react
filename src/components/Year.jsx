import React from 'react'
import {Map} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'
import {Month} from './Month'

export class Year extends PureRenderComponent {
    getYear() {
        return this.props.year.get('name')
    }

    getTitle() {
        return this.getYear()
    }

    getTree() {
        return this.props.year.get('tree').sortBy(month => -month.get('name'))
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">{this.getTitle()}</h3>
            </div>
            <table className="table">
                <tbody>
                {this.getTree().map(month =>
                    <Month key={`Month:${month.get('name')}`} month={month} year={this.getYear()}/>
                )}
                </tbody>
            </table>
        </div>
    }
}

Year.propTypes = {
    year: React.PropTypes.instanceOf(Map).isRequired
}

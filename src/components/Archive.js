import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'
import {Year} from './Year'

export class DisplayArchive extends PureRenderComponent {
    getData() {
        return this.props.data.sortBy(year => -year.get('name'))
    }

    render() {
        return <div>
            {this.getData().map(year =>
                <Year key={`Year:${year.get('name')}`} year={year}/>
            )}
        </div>
    }
}

DisplayArchive.propTypes = {
    data: React.PropTypes.instanceOf(List).isRequired
}

export function mapStateToProps(state) {
    const props = {}

    if (state && state.data && state.data.has('data')) {
        props.data = state.data.get('data')
    }

    return props
}

export const Archive = connect(mapStateToProps)(DisplayArchive)



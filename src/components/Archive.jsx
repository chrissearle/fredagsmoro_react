import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'
import {Year} from './Year'

const defaultState = List()

export class Archive extends PureRenderComponent {
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

Archive.propTypes = {
    data: React.PropTypes.instanceOf(List).isRequired
}

function mapStateToProps(state) {
    return {
        data: state.data.get('data') || defaultState
    }
}

export const ArchiveContainer = connect(mapStateToProps)(Archive)



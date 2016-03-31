import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Map,List} from 'immutable'

import {getLatestFromState} from '../helpers'

import {PureRenderComponent} from './PureRenderComponent'
import {Authors} from './Authors'

const defaultState = Map()

export class DisplayFrontPage extends PureRenderComponent {
    getTitle() {
        return this.props.latest.get('title')
    }

    getLink() {
        return this.props.latest.get('link')
    }

    renderPeople() {
        if (this.props.people) {
            return <Authors people={this.props.people}/>
        }

        return ''
    }

    render() {
        let latestLink = ''

        if (this.getTitle()) {
            latestLink = <h3>Latest: <Link className="latest" to={this.getLink()}>{this.getTitle()}</Link></h3>
        }

        return <div className="jumbotron">
            <h1>Fredagsmoro</h1>

            {latestLink}

            <h4>Archive: <Link className="archive" to="/archive/">Browse by date</Link></h4>

            {this.renderPeople()}
        </div>
    }
}

DisplayFrontPage.propTypes = {
    latest: React.PropTypes.instanceOf(Map).isRequired,
    people: React.PropTypes.instanceOf(List)
}


export function mapStateToProps(state) {
    const props = {
        latest: getLatestFromState(state, defaultState)
    }

    if (state.data && state.data.has('people')) {
        props.people = state.data.get('people')
    }

    return props
}

export const FrontPage = connect(mapStateToProps)(DisplayFrontPage)



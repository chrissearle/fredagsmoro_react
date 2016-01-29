import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Map} from 'immutable'

import {getLatestFromState} from '../helpers'

import {PureRenderComponent} from './PureRenderComponent'
import {AuthorsContainer} from './Authors'

const defaultState = Map()

export class FrontPage extends PureRenderComponent {
    getTitle() {
        return this.props.latest.get('title')
    }

    getLink() {
        return this.props.latest.get('link')
    }


    render() {
        var latestLink = ''

        if (this.getTitle()) {
            latestLink = <h3>Latest: <Link className="latest" to={this.getLink()}>{this.getTitle()}</Link></h3>
        }

        return <div className="jumbotron">
            <h1>Fredagsmoro</h1>

            {latestLink}

            <h4>Archive: <Link className="archive" to="/archive/">Browse by date</Link></h4>

            <AuthorsContainer/>
        </div>
    }
}

FrontPage.propTypes = {
    latest: React.PropTypes.instanceOf(Map).isRequired
}


function mapStateToProps(state) {
    return {
        latest: getLatestFromState(state, defaultState)
    }
}

export const FrontPageContainer = connect(mapStateToProps)(FrontPage)



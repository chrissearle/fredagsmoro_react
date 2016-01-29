import React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

import {getLatestFromState} from '../helpers'

const defaultState = Map()

export class NavBar extends PureRenderComponent {
    getTitle() {
        return this.props.latest.get('title')
    }

    getLink() {
        return this.props.latest.get('link')
    }

    render() {
        var latestNav = ''

        if (this.getTitle()) {
            latestNav = [
                <p key="latestTitle" className="navbar-text">Latest:</p>,
                <ul key="latestLink" className="nav navbar-nav">
                    <li><a ref="latestNav" href={this.getLink()}>{ this.getTitle() }</a></li>
                </ul>
            ]
        }

        return <nav className="navbar navbar-inverse navbar-fixed-top ng-scope" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Fredagsmoro</a>
                </div>
                <div className="collapse navbar-collapse" id=" bs-example-navbar-collapse-1">
                    {latestNav}
                    <p className="navbar-text">Archive:</p>
                    <ul className="nav navbar-nav">
                        <li><a ref="archive" href="/archive/">Browse by date</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}

NavBar.propTypes = {
    latest: React.PropTypes.instanceOf(Map)
}

function mapStateToProps(state) {
    return {
        latest: getLatestFromState(state, defaultState)
    };
}

export const NavBarContainer = connect(mapStateToProps)(NavBar);



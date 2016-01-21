import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {IndexLink,Link} from 'react-router';
import {connect} from 'react-redux';

// TODO - Latest

export const NavBar = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
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
                    <a className="navbar-brand" href="/#/">Fredagsmoro</a>
                </div>
                <div className="collapse navbar-collapse" id=" bs-example-navbar-collapse-1">
                    <p className="navbar-text">Latest:</p>
                    <ul className="nav navbar-nav">
                        <li><a ref="latest" href="/#/YYYY/MM/DD/">Month DD, YYYY</a></li>
                    </ul>
                    <p className="navbar-text">Archive:</p>
                    <ul className="nav navbar-nav">
                        <li><a ref="archive" href="/#/archive/">Browse by date</a></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
});

function mapStateToProps(state) {
    return {
    };
}

export const NavBarContainer = connect(mapStateToProps)(NavBar);



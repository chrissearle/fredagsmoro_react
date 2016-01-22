import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {IndexLink,Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import {fromJS} from 'immutable';

export const NavBar = React.createClass({
    mixins: [PureRenderMixin],
    getLatest: function () {
        return this.props.latest;
    },
    getTitle: function () {
        let latest = this.getLatest();

        if (latest) {
            return moment(latest.get('year') + "-" + latest.get('month') + "-" + latest.get('date'), "YYYY-MM-DD hh:mm:ss").format("LL");
        }

        return "";
    },
    getLink: function () {
        let latest = this.getLatest();

        if (latest) {
            return "/#/" + latest.get("year") + "/" + latest.get("month") + "/" + latest.get("date") + "/";
        }

        return "/#/";
    },
    render: function () {
        let latest = this.getLatest();

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
                        <li><a ref="latest"
                               href={this.getLink()}>{this.getTitle()}</a>
                        </li>
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
    if (state.has('data')) {
        let year = state.get('data').sortBy(year => -year.get('name')).first();
        let month = year.get('tree').sortBy(month => -month.get('name')).first();
        let date = month.get('tree').sortBy(date => -date.get('name')).first();

        return {
            latest: fromJS({
                year: year.get('name'),
                month: month.get('name'),
                date: date.get('name')
            })
        };
    }

    return {};
}

export const NavBarContainer = connect(mapStateToProps)(NavBar);



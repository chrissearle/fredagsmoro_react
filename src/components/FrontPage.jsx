import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {IndexLink,Link} from 'react-router';
import {connect} from 'react-redux';
import {getLatestFromState} from '../helpers';
import {AuthorsContainer} from './Authors';

export const FrontPage = React.createClass({
    mixins: [PureRenderMixin],
    getTitle: function () {
        return this.props.latest.get('title');
    },
    getLink: function () {
        return "/" + this.props.latest.get('link');
    },
    render: function () {
        var latestLink = '';

        if (this.getTitle()) {
            latestLink = <h3>Latest: <a className="latest" href={this.getLink()}>{this.getTitle()}</a></h3>;
        }

        return <div className="jumbotron">
            <h1>Fredagsmoro</h1>

            {latestLink}

            <h4>Archive: <a className="archive" href="/archive/">Browse by date</a></h4>

            <AuthorsContainer/>
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        latest: getLatestFromState(state)
    };
}

export const FrontPageContainer = connect(mapStateToProps)(FrontPage);



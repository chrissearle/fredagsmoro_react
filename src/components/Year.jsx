import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Month} from './Month';
import {List} from 'immutable';

export const Year = React.createClass({
    mixins: [PureRenderMixin],
    getYear: function () {
        return this.props.year.get('name')
    },
    getTitle: function () {
        return this.getYear();
    },
    getTree: function () {
        if (this.props.year) {
            return this.props.year.get('tree').sortBy(month => -month.get('name'));
        } else {
            return List();
        }
    },
    render: function () {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">{this.getTitle()}</h3>
            </div>
            <table className="table">
                <tbody>
                {this.getTree().map(month =>
                    <Month key={"Month:" + month.get('name')} month={month} year={this.getYear()}/>
                )}
                </tbody>
            </table>
        </div>;
    }
});

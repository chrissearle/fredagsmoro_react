import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import moment from 'moment';
import {Date} from './Date';

export const Month = React.createClass({
    mixins: [PureRenderMixin],
    getMonth: function () {
        return this.props.month.get('name');
    },
    getTitle: function () {
        return moment().month(parseInt(this.getMonth()) - 1).format("MMM");
    },
    getYear: function () {
        return this.props.year;
    },
    getTree: function () {
        if (this.props.month) {
            return this.props.month.get('tree').sortBy(date => date.get('name'));
        } else {
            return List();
        }
    },
    render: function () {
        var spacers = [];

        let missing = 5 - this.getTree().size;

        for (var i = 0; i < missing; i++) {
            spacers.push(<td key={"spacer:" + i}/>);
        }

        return <tr>
            <th>{this.getTitle()}</th>
            {this.getTree().map(date =>
                <Date key={"Date:" + date.get('name')} date={date} month={this.getMonth()} year={this.getYear()}/>
            )}
            {spacers}
        </tr>;
    }
});

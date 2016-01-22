import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import moment from 'moment';

export const Date = React.createClass({
    mixins: [PureRenderMixin],
    getDate: function () {
        return this.props.date.get('name');
    },
    getTitle: function () {
        return moment().date(parseInt(this.getDate())).format("Do");
    },
    getYear: function () {
        return this.props.year;
    },
    getMonth: function () {
        return this.props.month;
    },
    getCount: function () {
        return this.props.date.get('tree').size;
    },
    render: function () {
        return <td>
            <a href={"/#/" + this.getYear() + "/" + this.getMonth() + "/" + this.getDate() + "/"}>
                {this.getTitle()}
            </a>
            &nbsp;
            -
            &nbsp;
            <span className="badge">
                {this.getCount()} images
            </span>
        </td>;
    }
});

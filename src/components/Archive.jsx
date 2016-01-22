import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {Year} from './Year';

export const Archive = React.createClass({
    mixins: [PureRenderMixin],
    getData: function () {
        if (this.props.data) {
            return this.props.data.sortBy(year => -year.get('name'));
        } else {
            return List();
        }
    },
    render: function () {
        return <div>
            {this.getData().map(year =>
                <Year key={"Year:" + year.get('name')} year={year}/>
            )}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        data: state.get('data')
    };
}

export const ArchiveContainer = connect(mapStateToProps)(Archive);



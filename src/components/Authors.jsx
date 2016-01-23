import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Authors = React.createClass({
    mixins: [PureRenderMixin],
    getPeople: function () {
        return this.props.people || [];
    },
    render: function () {
        return <table className="table table-condensed">
            <thead>
            <tr>
                <th colSpan="3">Collected by</th>
            </tr>
            </thead>
            <tbody>
            {this.getPeople().map(person =>
                <tr key={person.get('name')}>
                    <td><img className="img-circle" alt={person.get('name')} title={person.get('name')} src={"/img/" + person.get('avatar')}/></td>
                    <td>{person.get('name')}</td>
                    <td>{person.get('period')}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
});

function mapStateToProps(state) {
    return {
        people: state.get('people')
    };
}
export const AuthorsContainer = connect(mapStateToProps)(Authors);


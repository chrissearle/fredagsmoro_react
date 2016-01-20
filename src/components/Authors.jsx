import React from 'react';

export default React.createClass({
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
                <tr key={person.name}>
                    <td><img className="img-circle" alt={person.name} title={person.name} src={"img/" + person.avatar}/></td>
                    <td>{person.name}</td>
                    <td>{person.period}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
});
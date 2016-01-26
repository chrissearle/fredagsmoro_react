import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

export class Authors extends PureRenderComponent {
    getPeople() {
        return this.props.people
    }

    render() {
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
        </table>
    }
}

Authors.propTypes = {
    people: React.PropTypes.instanceOf(List).isRequired
}

function mapStateToProps(state) {
    return {
        people: state.get('people')
    }
}

export const AuthorsContainer = connect(mapStateToProps)(Authors)


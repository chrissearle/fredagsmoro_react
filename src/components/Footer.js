import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

export class DisplayFooter extends PureRenderComponent {
    getPeople() {
        return this.props.people
    }

    render() {
        return <footer className="footer">
            <div className="col-md-1"></div>
            <div className="col-md-2">
                <p>
                    Ba Dum Tish
                </p>
            </div>
            {this.getPeople().map(person =>
                [
                    <div key={`${person.get('name')}1`} className="col-md-1">
                        <p>
                            <img className="img-circle" alt={person.get('name')} title={person.get('name')}
                                 src={`/img/${person.get('avatar')}`}/>
                        </p>
                    </div>,
                    <div key={`${person.get('name')}2`} className="col-md-2">
                        <p>{person.get('name')}</p>
                        <p>{person.get('period')}</p>
                    </div>
                ]
            )}
        </footer>
    }
}

DisplayFooter.propTypes = {
    people: React.PropTypes.instanceOf(List).isRequired
}

export function mapStateToProps(state) {
    return {
        people: state.data.get('people')
    }
}

export const Footer = connect(mapStateToProps)(DisplayFooter)


import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {PureRenderComponent} from './PureRenderComponent'

export class Footer extends PureRenderComponent {
    getPeople() {
        return this.props.people
    }

    render() {
        return <footer className="footer">
            <div className="col-md-4">
                <p>
                    Ba Dum Tish
                </p>
            </div>
            {this.getPeople().map(person =>
                [
                    <div key={person.get('name') + "1"} className="col-md-1">
                        <p>
                            <img className="img-circle" alt={person.get('name')} title={person.get('name')}
                                 src={"/img/" + person.get('avatar')}/>
                        </p>
                    </div>,
                    <div key={person.get('name') + "2"} className="col-md-3">
                        <p>{person.get('name')}</p>
                        <p>{person.get('period')}</p>
                    </div>
                ]
            )}
        </footer>
    }
}

Footer.propTypes = {
    people: React.PropTypes.instanceOf(List).isRequired
}

function mapStateToProps(state) {
    return {
        people: state.get('people')
    }
}

export const FooterContainer = connect(mapStateToProps)(Footer)


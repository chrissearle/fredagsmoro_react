import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Footer = React.createClass({
    mixins: [PureRenderMixin],
    getPeople: function () {
        return this.props.people || [];
    },
    render: function () {
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
                                 src={"img/" + person.get('avatar')}/>
                        </p>
                    </div>,
                    <div key={person.get('name') + "2"} className="col-md-3">
                        <p>{person.get('name')}</p>
                        <p>{person.get('period')}</p>
                    </div>
                ]
            )}
        </footer>;
    }
});

function mapStateToProps(state) {
    return {
        people: state.get('people')
    };
}

export const FooterContainer = connect(mapStateToProps)(Footer);


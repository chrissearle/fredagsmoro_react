import React from 'react';

export default React.createClass({
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
                    <div key={person.name + "1"} className="col-md-1">
                        <p>
                            <img className="img-circle" alt={person.name} title={person.name}
                                 src={"img/" + person.avatar}/>
                        </p>
                    </div>,
                    <div key={person.name + "2"} className="col-md-3">
                        <p>{person.name}</p>
                        <p>{person.period}</p>
                    </div>
                ]
            )}
        </footer>;
    }
});



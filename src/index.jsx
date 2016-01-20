import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {List} from 'immutable';
import {AuthorsContainer} from './components/Authors';
import {FooterContainer} from './components/Footer';

const store = createStore(reducer);

store.dispatch({
    type: 'SET_STATE',
    state: {
        people: [
            {
                "name": "Ragnar Bergvik",
                "period": "May 2011 - Jan 2015",
                "avatar": "ragnar.jpg"
            },
            {
                "name": "Karl Øgaard",
                "period": "Feb 2015 -",
                "avatar": "karl.jpg"
            }
        ],
        data: []
    }
});

ReactDOM.render(
    <Provider store={store}>
        <AuthorsContainer/>
    </Provider>,
    document.getElementById('app')
);

ReactDOM.render(
    <Provider store={store}>
        <FooterContainer/>
    </Provider>,
    document.getElementById('footer')
);
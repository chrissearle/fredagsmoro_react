import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router,Route,hashHistory } from 'react-router';
import {List} from 'immutable';
import $ from 'jquery';
import reducer from './reducer';
import {App} from './components/App';
import {FrontPageContainer} from './components/FrontPage';
import {ArchiveContainer} from './components/Archive';
import {ShowContainer} from './components/Show';
import {FooterContainer} from './components/Footer';
import {NavBarContainer} from './components/NavBar';

const store = createStore(reducer);

// Quick Fix - since the data is static
$.get("/people.json", function (people) {
    $.get("/data.json", function (data) {
        store.dispatch({
            type: 'SET_STATE',
            state: {
                people: people,
                data: data
            }
        });
    });
});

const routes = <Route component={App}>
    <Route path="/" component={FrontPageContainer}/>
    <Route path="/archive" component={ArchiveContainer}/>
    <Route path="/:year/:month/:day" component={ShowContainer}/>
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

ReactDOM.render(
    <Provider store={store}>
        <FooterContainer/>
    </Provider>,
    document.getElementById('footer')
);

ReactDOM.render(
    <Provider store={store}>
        <NavBarContainer/>
    </Provider>,
    document.getElementById('navbar')
);
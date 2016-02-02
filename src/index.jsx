import React from 'react'
import ReactDOM from 'react-dom'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Router,Route,IndexRoute,Redirect,browserHistory } from 'react-router'

import ga from 'ga-react-router'

import {fromJS} from 'immutable'

import $ from 'jquery'

import reducer from './reducer'

import {App} from './components/App'
import {FrontPageContainer} from './components/FrontPage'
import {ArchiveContainer} from './components/Archive'
import {ShowContainer} from './components/Show'
import {FooterContainer} from './components/Footer'
import {NavBarContainer} from './components/NavBar'

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer, fromJS({
    people: [],
    data: []
}));

// Quick Fix - since the data is static
$.get("/people.json", function (people) {
    $.get("/data.json", function (data) {
        store.dispatch({
            type: 'SET_STATE',
            state: {
                people: people,
                data: data
            }
        })
    })
})

const routes = <Route path="/" component={App}>
    <IndexRoute component={FrontPageContainer}/>
    <Route path="/archive" component={ArchiveContainer}/>
    <Route path="/:year/:month/:day" component={ShowContainer}/>
    <Redirect from="*" to="/"/>
</Route>

const headerRoutes = <Route path="/" component={App}>
    <IndexRoute component={NavBarContainer}/>
    <Route path="*" component={NavBarContainer}/>
</Route>

var unlisten

if (typeof GA_TRACKING_CODE !== 'undefined') {
    unlisten = browserHistory.listen(location => {
        ga('send', 'pageview', location.pathname)
    })
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
)

if (typeof GA_TRACKING_CODE !== 'undefined') {
    unlisten()
}

ReactDOM.render(
    <Provider store={store}>
        <FooterContainer/>
    </Provider>,
    document.getElementById('footer')
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>{headerRoutes}</Router>
    </Provider>,
    document.getElementById('navbar')
)


/* globals window document */

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'

import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import ga from 'ga-react-router'

import $ from 'jquery'

import reducer from './reducer'

import {App} from './components/App'
import {FrontPageContainer} from './components/FrontPage'
import {ArchiveContainer} from './components/Archive'
import {ShowContainer} from './components/Show'
import {FooterContainer} from './components/Footer'
import {NavBarContainer} from './components/NavBar'

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(
    combineReducers({
        data: reducer,
        routing: routerReducer
    })
)

const history = syncHistoryWithStore(browserHistory, store)

// Quick Fix - since the data is static
$.get('/people.json', function (people) {
    $.get('/data.json', function (data) {
        store.dispatch(
            {
                type: 'SET_STATE',
                data: {
                    state: {
                        people: people,
                        data: data
                    }
                }
            }
        )
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

if (typeof GA_TRACKING_CODE !== 'undefined') {
    history.listen(location => {
        ga('send', 'pageview', location.pathname)
    })
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
)

ReactDOM.render(
    <Provider store={store}>
        <FooterContainer/>
    </Provider>,
    document.getElementById('footer')
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>{headerRoutes}</Router>
    </Provider>,
    document.getElementById('navbar')
)


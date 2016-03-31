/* globals window document */

import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router'

import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import ga from 'ga-react-router'

import $ from 'jquery'

import reducer from './reducer'

import App from './components/App'
import {FrontPage} from './components/FrontPage'
import {Archive} from './components/Archive'
import {Show} from './components/Show'

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

if (typeof GA_TRACKING_CODE !== 'undefined') {
    history.listen(location => {
        ga('send', 'pageview', location.pathname)
    })
}

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={FrontPage}/>

                <Route path="/archive" component={Archive}/>
                <Route path="/:year/:month/:day" component={Show}/>
                <Redirect from="*" to="/"/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
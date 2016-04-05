/* globals window, document */
import 'babel-polyfill'

import 'isomorphic-fetch'

import React from 'react'
import {render} from 'react-dom'

import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router'

import {createStore, combineReducers} from 'redux'

import {Provider} from 'react-redux'

import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

import ga from 'ga-react-router'

import {fetchData} from './action_creators/data'
import {fetchPeople} from './action_creators/people'

import reducer from './reducers/reducer'

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

fetchPeople()(store.dispatch)
fetchData()(store.dispatch)

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

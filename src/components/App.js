import React from 'react'

import {connect} from 'react-redux'

import {PureRenderComponent} from './PureRenderComponent'

import {NavBar} from './NavBar'
import {Footer} from './Footer'

import {fetchData} from '../action_creators/data'
import {fetchPeople} from '../action_creators/people'

export class ViewApp extends PureRenderComponent {
    componentWillMount() {
        this.props.updatePeople()
        this.props.updateData()
    }

    render() {
        return (
            <div>
                <NavBar/>

                <div className="container">
                    <div className="row">
                        {this.props.children}
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        updatePeople: function () {
            fetchPeople()(dispatch)
        },
        updateData: function () {
            fetchData()(dispatch)
        }
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(ViewApp)

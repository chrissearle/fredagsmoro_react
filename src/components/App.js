import React from 'react'

import {NavBar} from './NavBar'
import {Footer} from './Footer'

export default React.createClass({
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
})



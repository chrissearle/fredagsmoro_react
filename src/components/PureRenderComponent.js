import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export class PureRenderComponent extends React.Component {
    shouldComponentUpdate () {
        return PureRenderMixin.shouldComponentUpdate.apply(this, arguments)
    }
}

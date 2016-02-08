import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {Map, List} from 'immutable'
import {weekDisplayTitle} from '../helpers'
import {Image} from './Image'

export const Show = React.createClass({
    mixins: [PureRenderMixin],
    filterTree: function (haystack, needle) {
        return haystack.valueSeq().filter(i => i.get('name') === needle).first()
    },
    getData: function () {
        return this.props.data || List()
    },
    getEntry: function () {
        const data = this.getData()

        if (data && data.size > 0) {
            const year = this.filterTree(List(data), this.props.params.year)
            const month = this.filterTree(year.get('tree'), this.props.params.month)
            const date = this.filterTree(month.get('tree'), this.props.params.day)
            return {
                year: year.get('name'),
                month: month.get('name'),
                date: date.get('name'),
                items: date.get('tree'),
                title: weekDisplayTitle(year.get('name'), month.get('name'), date.get('name'))
            }
        }

        return {
            items: List()
        }
    },
    render: function () {
        const entry = this.getEntry()

        return <div>
            <h1>{entry.title}</h1>
            {entry.items.map((item, key) =>
                <Image key={`Image:${key}`} item={item}/>
            )}
        </div>
    }
})

function mapStateToProps(state) {
    return {
        data: state.get('data')
    }
}

export const ShowContainer = connect(mapStateToProps)(Show)



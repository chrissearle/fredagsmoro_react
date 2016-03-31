import React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'
import {PureRenderComponent} from './PureRenderComponent'
import {weekDisplayTitle} from '../helpers'
import {Image} from './Image'

export class Show extends PureRenderComponent {

    filterTree(haystack, needle) {
        function nameFilter(value) {
            return value.get('name') === needle;
        }

        return haystack.valueSeq().filter(nameFilter).first()
    }

    getEntry() {
        const data = this.props.data

        if (data && data.size > 0) {
            const year = this.filterTree(List(data), this.props.params.year)

            if (year) {
                const month = this.filterTree(year.get('tree'), this.props.params.month)

                if (month) {
                    const date = this.filterTree(month.get('tree'), this.props.params.day)

                    if (date) {
                        return {
                            year: year.get('name'),
                            month: month.get('name'),
                            date: date.get('name'),
                            items: date.get('tree'),
                            title: weekDisplayTitle(year.get('name'), month.get('name'), date.get('name'))
                        }
                    }
                }
            }
        }

        return undefined
    }

    render() {
        const entry = this.getEntry()

        if (entry) {
            return <div>
                <h1>{entry.title}</h1>
                {entry.items.map((item, key) =>
                    <Image key={`Image:${key}`} item={item}/>
                )}
            </div>
        }

        return <div><h1>Missing entry</h1></div>
    }
}

export function mapStateToProps(state) {
    return {
        data: state.data.get('data')
    }
}

export const ShowContainer = connect(mapStateToProps)(Show)



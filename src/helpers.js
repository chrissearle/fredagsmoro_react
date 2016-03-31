import {fromJS, Map} from 'immutable'
import moment from 'moment'

export function weekDisplayTitle(year, month, day) {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD hh:mm:ss').format('LL')
}

export function dateArchiveTitle(date) {
    return moment().date(date).format('Do')
}

export function monthArchiveTitle(month) {
    return moment().month(month).format('MMM')
}

export function getLatestFromState(state, defaultValue) {
    if (state === undefined) {
        return defaultValue
    }

    const data = state.data

    if (data === undefined) {
        return defaultValue
    }



    if (data.has('data')) {
        if (data.get('data').size > 0) {

            const year = data.get('data').sortBy(year => -year.get('name')).first()
            const month = year.get('tree').sortBy(month => -month.get('name')).first()
            const date = month.get('tree').sortBy(date => -date.get('name')).first()

            return fromJS({
                year: year.get('name'),
                month: month.get('name'),
                date: date.get('name'),
                title: weekDisplayTitle(year.get('name'), month.get('name'), date.get('name')),
                link: `/${year.get('name')}/${month.get('name')}/${date.get('name')}/`
            })

        }
    }

    return defaultValue
}

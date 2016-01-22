import {fromJS, Map} from 'immutable';
import moment from 'moment';

export function entryTitle(year, month, day) {
    return moment(year + "-" + month + "-" + day, "YYYY-MM-DD hh:mm:ss").format("LL")
}
export function getLatestFromState(state) {
    if (state.has('data')) {
        let year = state.get('data').sortBy(year => -year.get('name')).first();
        let month = year.get('tree').sortBy(month => -month.get('name')).first();
        let date = month.get('tree').sortBy(date => -date.get('name')).first();

        return fromJS({
            year: year.get('name'),
            month: month.get('name'),
            date: date.get('name'),
            title: entryTitle(year.get('name'), month.get('name'), date.get('name')),
            link: year.get("name") + "/" + month.get("name") + "/" + date.get("name") + "/"
        });
    }

    return Map();
}

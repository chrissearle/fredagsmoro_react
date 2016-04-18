/* globals fetch DATA_URL */
import {updateData} from '../actions/data'

export function fetchData() {

    let data_url = '/data.json'

    if (typeof DATA_URL !== 'undefined') {
        data_url = DATA_URL
    }

    return dispatch =>
        fetch(data_url, {mode: 'cors'})
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(updateData(json))
            })
            .catch(error => {
                throw error
            })
}

import {updateData} from '../actions/data'

export function fetchData() {
    return dispatch =>
        fetch('/data.json')
            .then(response => {
                response.json().then(json => {
                    dispatch(updateData(json))
                })
            })
}

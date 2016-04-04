/* globals fetch */
import {updatePeople} from '../actions/people'

export function fetchPeople() {
    return dispatch =>
        fetch('/people.json')
            .then(response => {
                response.json().then(json => {
                    dispatch(updatePeople(json))
                })
            })
}

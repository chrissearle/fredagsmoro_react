/* globals fetch */
import {updatePeople} from '../actions/people'

export function fetchPeople() {
    return dispatch =>
        fetch('/people.json')
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(updatePeople(json))
            })
            .catch(error => {
                throw error
            })
}

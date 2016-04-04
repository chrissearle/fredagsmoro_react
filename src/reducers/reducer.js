import {fromJS} from 'immutable'

const initialState = fromJS({
    people: [],
    data: []
})

function setState(state, newState) {
    return state.merge(newState)
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_DATA':
            return setState(state, {
                data: action.data
            })
        case 'UPDATE_PEOPLE':
            return setState(state, {
                people: action.people
            })
    }

    return state
}
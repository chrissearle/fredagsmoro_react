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
        case 'SET_STATE':
            return setState(state, action.data.state)
    }
    return state
}
/* globals describe, it */

import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {
    const people = [
        {
            'name': 'Ragnar Bergvik',
            'period': 'May 2011 - Jan 2015',
            'avatar': 'ragnar.jpg'
        },
        {
            'name': 'Karl Øgaard',
            'period': 'Feb 2015 -',
            'avatar': 'karl.jpg'
        }
    ]

    it('handles SET_STATE', () => {
        const initialState = Map()

        const action = {
            type: 'SET_STATE',
            state: Map({
                people: fromJS(people),
                data: List()
            })
        }

        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            people: people,
            data: []
        }))
    })

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: Map({
                people: fromJS(people),
                data: List()
            })
        }

        const nextState = reducer(undefined, action)

        expect(nextState).to.equal(fromJS({
            people: people,
            data: []
        }))
    })
})
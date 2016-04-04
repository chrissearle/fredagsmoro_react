/* eslint-env mocha */
import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import {updateData} from '../src/actions/data'
import {updatePeople} from '../src/actions/people'

import reducer from '../src/reducers/reducer'

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

    const data = [
        {
            'name': '2011',
            'tree': [
                {
                    'name': '05',
                    'tree': [
                        {
                            'name': '06'
                        }
                    ]
                }
            ]
        },
        {
            'name': '2015',
            'tree': [
                {
                    'name': '05',
                    'tree': [
                        {
                            'name': '06'
                        }
                    ]
                },
                {
                    'name': '12',
                    'tree': [
                        {
                            'name': '06'
                        },
                        {
                            'name': '31'
                        }
                    ]
                }
            ]
        }
    ]

    it('handles UPDATE_PEOPLE', () => {
        const initialState = fromJS({
            people: [],
            data: []
        })

        const action = updatePeople(people)

        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            people: people,
            data: []
        }))
    })

    it('handles UPDATE_PEOPLE without initial state', () => {
        const action = updatePeople(people)

        const nextState = reducer(undefined, action)

        expect(nextState).to.equal(fromJS({
            people: people,
            data: []
        }))
    })

    it('handles UPDATE_DATA', () => {
        const initialState = fromJS({
            people: [],
            data: []
        })

        const action = updateData(data)

        const nextState = reducer(initialState, action)

        expect(nextState).to.equal(fromJS({
            people: [],
            data: data
        }))
    })

    it('handles UPDATE_DATA without initial state', () => {
        const action = updateData(data)

        const nextState = reducer(undefined, action)

        expect(nextState).to.equal(fromJS({
            people: [],
            data: data
        }))
    })

    it('handles unknown actions', () => {
        const action = {
            type: 'AN_UNKNOWN_TYPE',
            data: {
                state: Map()
            }
        }

        const nextState = reducer(undefined, action)

        expect(nextState).to.equal(fromJS({
            people: [],
            data: []
        }))
    })
})
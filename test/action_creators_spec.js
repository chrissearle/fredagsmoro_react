/* eslint-env mocha */
/* globals global, Promise */
import {expect} from 'chai'
import sinon from 'sinon'

import 'isomorphic-fetch'

import {updateData} from '../src/actions/data'
import {updatePeople} from '../src/actions/people'

import {fetchData} from '../src/action_creators/data'
import {fetchPeople} from '../src/action_creators/people'

describe('action_creators', () => {
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

    let sandbox

    beforeEach(() => {
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('fetches people', () => {
        sandbox.stub(global, 'fetch').returns(Promise.resolve({json: () => Promise.resolve(people)}))

        return new Promise(resolve => {
            fetchPeople()(resolve)
        })
            .then(action => expect(action).to.deep.equal(updatePeople(people)))
    })

    it('fetches data', () => {
        sandbox.stub(global, 'fetch').returns(Promise.resolve({json: () => Promise.resolve(data)}))

        return new Promise(resolve => {
            fetchData()(resolve)
        })
            .then(action => expect(action).to.deep.equal(updateData(data)))
    })
})

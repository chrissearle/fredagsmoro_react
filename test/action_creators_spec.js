import {expect} from 'chai'

import nock from 'nock'
import 'isomorphic-fetch'

import {updateData} from '../src/actions/data'
import {updatePeople} from '../src/actions/people'

import {fetchData} from '../src/action_creators/data'
import {fetchPeople} from '../src/action_creators/people'


// Currently skipped. Requires the URL in the action creators to be to //host/endpoint (here localhost) to get nock to
// trigger but this locks the action creators to a given host instead of relative to where it's running from.
describe.skip('action_creators', () => {
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

    afterEach(() => {
        nock.cleanAll()
    })

    it('fetches people', (done) => {
        nock(/localhost/)
            .get('/people.json')
            .reply(200, people)

        const dispatch = action => {
            expect(action).to.deep.equal(updatePeople(people))

            done()
        }

        fetchPeople()(dispatch)
    })

    it('fetches data', (done) => {
        nock(/localhost/)
            .get('/data.json')
            .reply(200, data)

        const dispatch = action => {
            expect(action).to.deep.equal(updateData(data))

            done()
        }

        fetchData()(dispatch)
    })
})

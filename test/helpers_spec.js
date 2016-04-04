import {fromJS, Map} from 'immutable'
import {expect} from 'chai'

import {getLatestFromState} from '../src/helpers'

describe('getLatestFromState', () => {
    const state = {
        data: fromJS(
            {
                data: [
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
            }
        )
    }

    it('gets the correct state', () => {
        const latest = getLatestFromState(state, Map())

        expect(latest.get('year')).to.equal('2015')
        expect(latest.get('month')).to.equal('12')
        expect(latest.get('date')).to.equal('31')
        expect(latest.get('title')).to.equal('December 31, 2015')
        expect(latest.get('link')).to.equal('/2015/12/31/')
    })

    it('returns the default state if no state passed', () => {
        const latest = getLatestFromState(undefined, Map())

        expect(latest).to.equal(Map())
    })

    it('returns the default state if state with no data passed', () => {
        const latest = getLatestFromState({}, Map())

        expect(latest).to.equal(Map())
    })

    it('returns the default state if state with no date data passed', () => {
        const latest = getLatestFromState({
            data: fromJS({})
        }, Map())

        expect(latest).to.equal(Map())
    })

    it('returns the default state if state with empty date data passed', () => {
        const latest = getLatestFromState({
            data: fromJS({data: []})
        }, Map())

        expect(latest).to.equal(Map())
    })
})

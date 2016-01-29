import {fromJS, Map} from 'immutable';
import {expect} from 'chai';

import {getLatestFromState} from '../src/helpers';

describe('getLatestFromState', () => {
    const state = fromJS({
        data: [
            {
                "name": "2011",
                "tree": [
                    {
                        "name": "05",
                        "tree": [
                            {
                                "name": "06"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "2015",
                "tree": [
                    {
                        "name": "05",
                        "tree": [
                            {
                                "name": "06"
                            }
                        ]
                    },
                    {
                        "name": "12",
                        "tree": [
                            {
                                "name": "06"
                            },
                            {
                                "name": "31"
                            }
                        ]
                    }
                ]
            }
        ]
    });

    it('gets the correct state', () => {
        let latest = getLatestFromState(state, Map());

        expect(latest.get('year')).to.equal("2015");
        expect(latest.get('month')).to.equal("12");
        expect(latest.get('date')).to.equal("31");
        expect(latest.get('title')).to.equal("December 31, 2015");
        expect(latest.get('link')).to.equal('/2015/12/31/');
    });
});

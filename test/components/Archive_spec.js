/* eslint-env mocha */
import React from 'react'
import {DisplayArchive, mapStateToProps} from '../../src/components/Archive'
import {expect} from 'chai'
import {fromJS} from 'immutable'

import TestUtils from 'react-addons-test-utils'

describe('DisplayArchive', () => {
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
            name: '2016',
            tree: [
                {
                    name: '01',
                    tree: [
                        {
                            name: '22',
                            tree: [
                                {
                                    src: '/content/2016/01/22/12571315_10156492193140341_1844409780_n.jpg'
                                },
                                {
                                    src: '/content/2016/01/22/eUAZk6c.webm'
                                },
                                {
                                    src: '/content/2016/01/22/kreditt.png'
                                },
                                {
                                    src: '/content/2016/01/22/uMOgiO9.mp4'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    it('handles undefined state', () => {
        const props = mapStateToProps(undefined)

        expect(props).to.deep.equal({})
    })

    it('handles empty state', () => {
        const props = mapStateToProps({})

        expect(props).to.deep.equal({})
    })

    it('handles state with no data', () => {
        const props = mapStateToProps({
            dummy: {}
        })

        expect(props).to.deep.equal({})
    })

    it('maps state to correct props', () => {
        const props = mapStateToProps({
            data: fromJS({
                data: data
            })
        })

        expect(props.data.toJS()).to.deep.equal(data)
    })

    it('creates the correct structure', () => {
        const renderer = TestUtils.createRenderer()

        renderer.render(<DisplayArchive data={fromJS(data)}/>)

        const output = renderer.getRenderOutput()

        expect(output.props.children.size).to.equal(2)

        output.props.children.forEach(item => expect(item.type.name).to.equal('Year'))
    })
})



/* eslint-env mocha */
import React from 'react'
import {Entry, mapStateToProps} from '../../src/components/Show'
import {expect} from 'chai'
import {fromJS,Map} from 'immutable'

import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'

describe('Entry', () => {

    const data = [
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
                                    src: '/2016/01/22/12571315_10156492193140341_1844409780_n.jpg'
                                },
                                {
                                    src: '/2016/01/22/eUAZk6c.webm'
                                },
                                {
                                    src: '/2016/01/22/kreditt.png'
                                },
                                {
                                    src: '/2016/01/22/uMOgiO9.mp4'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    const params = {
        year: '2016',
        month: '01',
        day: '22'
    }

    it('renders the correct title', () => {
        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={params}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('January 22, 2016')
    })

    it('renders the correct images', () => {
        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={params}/>
        )

        const images = scryRenderedDOMComponentsWithTag(component, 'img')
        expect(images.length).to.equal(2)
        expect(images[0].src).to.equal('http://localhost/2016/01/22/12571315_10156492193140341_1844409780_n.jpg')
        expect(images[1].src).to.equal('http://localhost/2016/01/22/kreditt.png')
    })

    it('renders the correct videos', () => {
        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={params}/>
        )

        const videos = scryRenderedDOMComponentsWithTag(component, 'video')
        expect(videos.length).to.equal(2)
    })

    it('renders direct links', () => {
        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={params}/>
        )

        const buttons = scryRenderedDOMComponentsWithClass(component, 'btn-primary')
        expect(buttons.length).to.equal(4)
        expect(buttons[0].href).to.equal('http://localhost/2016/01/22/12571315_10156492193140341_1844409780_n.jpg')
        expect(buttons[1].href).to.equal('http://localhost/2016/01/22/eUAZk6c.webm')
        expect(buttons[2].href).to.equal('http://localhost/2016/01/22/kreditt.png')
        expect(buttons[3].href).to.equal('http://localhost/2016/01/22/uMOgiO9.mp4')
    })

    it('maps state to correct props', () => {
        const props = mapStateToProps({
            data: fromJS(Map(
                {
                    data: []
                }
            ))
        })

        expect(props.data).to.deep.equal([])
    })

    it('handles missing data', () => {
        const component = renderIntoDocument(
            <Entry data={fromJS([])} params={params}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('Missing entry')
    })

    it('handles no matching year', () => {
        const nonMatchingParams = {
            year: '2015',
            month: '02',
            day: '23'
        }

        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={nonMatchingParams}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('Missing entry')
    })

    it('handles no matching month', () => {
        const nonMatchingParams = {
            year: '2016',
            month: '02',
            day: '23'
        }

        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={nonMatchingParams}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('Missing entry')
    })

    it('handles no matching date', () => {
        const nonMatchingParams = {
            year: '2016',
            month: '01',
            day: '23'
        }

        const component = renderIntoDocument(
            <Entry data={fromJS(data)} params={nonMatchingParams}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('Missing entry')
    })
})

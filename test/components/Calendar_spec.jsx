/* globals describe, it */

import React from 'react/addons'
import {Year} from '../../src/components/Year'
import {expect} from 'chai'
import {fromJS} from 'immutable'

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils

describe('Calendar', () => {

    const data = {
        'name': '2011',
        'tree': [
            {
                'name': '05',
                'tree': [
                    {
                        'name': '06',
                        'tree': [
                            {
                                'src': '/content/2011/05/06/image001.png'
                            },
                            {
                                'src': '/content/2011/05/06/image002.png'
                            }
                        ]
                    }
                ]
            }
        ]
    }

    it('renders a calendar', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const panel = scryRenderedDOMComponentsWithClass(component, 'panel-default')
        expect(panel.length).to.equal(1)
    })

    it('renders the correct title', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const title = scryRenderedDOMComponentsWithClass(component, 'panel-title')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('2011')
    })

    it('renders the correct month', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const month = scryRenderedDOMComponentsWithTag(component, 'th')
        expect(month.length).to.equal(1)
        expect(month[0].textContent).to.equal('May')
    })

    it('renders the correct spacing', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const dates = scryRenderedDOMComponentsWithTag(component, 'td')
        expect(dates.length).to.equal(5)
        expect(dates[1].textContent).to.equal('')
        expect(dates[2].textContent).to.equal('')
        expect(dates[3].textContent).to.equal('')
        expect(dates[4].textContent).to.equal('')
    })

    it('renders the correct link', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const dates = scryRenderedDOMComponentsWithTag(component, 'a')
        expect(dates.length).to.equal(1)
        expect(dates[0].textContent).to.equal('6th')
    })

    it('renders the correct badge', () => {
        const component = renderIntoDocument(
            <Year year={fromJS(data)}/>
        )

        const badge = scryRenderedDOMComponentsWithTag(component, 'span')
        expect(badge.length).to.equal(1)
        expect(badge[0].textContent).to.equal('2 images')
    })
})
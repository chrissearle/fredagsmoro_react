/* eslint-env mocha */
import React from 'react'
import {DisplayFooter, mapStateToProps} from '../../src/components/Footer'
import {expect} from 'chai'
import {fromJS, Map} from 'immutable'

import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'

describe('DisplayFooter', () => {

    const people = [
        {
            'name': 'Person 1',
            'period': 'Period 1',
            'avatar': '1.jpg'
        },
        {
            'name': 'Person 2',
            'period': 'Period 2',
            'avatar': '2.jpg'
        }
    ]

    it('renders a footer', () => {
        const component = renderIntoDocument(
            <DisplayFooter people={fromJS([])} />
        )

        const footer =  scryRenderedDOMComponentsWithTag(component, 'footer')
        expect(footer.length).to.equal(1)
    })

    it('renders the slogan', () => {
        const component = renderIntoDocument(
            <DisplayFooter people={fromJS([])} />
        )

        const cells =  scryRenderedDOMComponentsWithTag(component, 'div')
        expect(cells.length).to.be.above(1)

        expect(cells[1].textContent).to.contain('Ba Dum Tish')
    })

    it('renders the correct images', () => {
        const component = renderIntoDocument(
            <DisplayFooter people={fromJS(people)} />
        )

        const images = scryRenderedDOMComponentsWithTag(component, 'img')
        expect(images.length).to.equal(2)
        expect(images[0].src).to.equal('http://localhost/img/1.jpg')
        expect(images[1].src).to.equal('http://localhost/img/2.jpg')
        expect(images[0].alt).to.equal('Person 1')
        expect(images[1].alt).to.equal('Person 2')
    })

    it('renders the correct information', () => {
        const component = renderIntoDocument(
            <DisplayFooter people={fromJS(people)} />
        )

        const cells =  scryRenderedDOMComponentsWithTag(component, 'div')
        expect(cells.length).to.equal(6)

        expect(cells[3].textContent).to.contain('Person 1')
        expect(cells[3].textContent).to.contain('Period 1')
        expect(cells[5].textContent).to.contain('Person 2')
        expect(cells[5].textContent).to.contain('Period 2')
    })

    it('maps state to correct props', () => {
        const props = mapStateToProps({
            data: fromJS(Map(
                {
                    people: people
                }
            ))
        })

        expect(props).to.deep.equal({
            people: people
        })
    })
})

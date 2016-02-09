/* globals describe, it */

import React from 'react/addons'
import {findDOMNode} from 'react-dom'
import {NavBar} from '../../src/components/NavBar'
import {expect} from 'chai'
import {fromJS,Map} from 'immutable'

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils

describe('NavBar', () => {

    it('renders a navbar', () => {
        const component = renderIntoDocument(
            <NavBar latest={Map()}/>
        )

        const navbar = scryRenderedDOMComponentsWithTag(component, 'nav')
        expect(navbar.length).to.equal(1)
    })

    it('has a home link', () => {
        const component = renderIntoDocument(
            <NavBar latest={Map()}/>
        )

        const brandLink = scryRenderedDOMComponentsWithClass(component, 'navbar-brand')
        expect(brandLink.length).to.equal(1)
        expect(brandLink[0].textContent).to.equal('Fredagsmoro')
    })

    it('has an archive link', () => {
        const component = renderIntoDocument(
            <NavBar latest={Map()}/>
        )

        const archive = findDOMNode(component.refs.archive)
        expect(archive.textContent).to.equal('Browse by date')
    })

    it('has a latest link', () => {
        const data = {
            year: '2016',
            month: '12',
            date: '07',
            title: 'December 7, 2016',
            link: '/2016/12/07/'
        }

        const component = renderIntoDocument(
            <NavBar latest={fromJS(data)}/>
        )

        const latest = findDOMNode(component.refs.latestNav)
        expect(latest.textContent).to.equal('December 7, 2016')
    })
})
/* eslint-env mocha */
import React from 'react'
import {findDOMNode} from 'react-dom'
import {DisplayNavBar, mapStateToProps} from '../../src/components/NavBar'
import {expect} from 'chai'
import {fromJS,Map} from 'immutable'

import {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils'

describe('DisplayNavBar', () => {
    const data = {
        year: '2016',
        month: '12',
        date: '07',
        title: 'December 7, 2016',
        link: '/2016/12/07/'
    }

    it('renders a navbar', () => {
        const component = renderIntoDocument(
            <DisplayNavBar latest={Map()}/>
        )

        const navbar = scryRenderedDOMComponentsWithTag(component, 'nav')
        expect(navbar.length).to.equal(1)
    })

    it('has a home link', () => {
        const component = renderIntoDocument(
            <DisplayNavBar latest={Map()}/>
        )

        const brandLink = scryRenderedDOMComponentsWithClass(component, 'navbar-brand')
        expect(brandLink.length).to.equal(1)
        expect(brandLink[0].textContent).to.equal('Fredagsmoro')
    })

    it('has an archive link', () => {
        const component = renderIntoDocument(
            <DisplayNavBar latest={Map()}/>
        )

        const archive = findDOMNode(component.refs.archive)
        expect(archive.textContent).to.equal('Browse by date')
    })

    it('has a latest link', () => {
        const component = renderIntoDocument(
            <DisplayNavBar latest={fromJS(data)}/>
        )

        const latest = findDOMNode(component.refs.latestNav)
        expect(latest.textContent).to.equal('December 7, 2016')
    })

    it('maps state to correct props with no data', () => {
        const props = mapStateToProps({})

        expect(props.latest).to.equal(Map())
    })

    it('maps state to correct props', () => {
        const props = mapStateToProps({
            data: fromJS(Map(
                {
                    data: fromJS([
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
                            'name': '2016',
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
                                            'name': '07'
                                        }
                                    ]
                                }
                            ]
                        }
                    ])
                }
            ))
        })

        expect(props.latest.toJS()).to.deep.equal(data)
    })
})
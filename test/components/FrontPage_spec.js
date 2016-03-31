/* globals describe, it */

import React from 'react'
import {FrontPage, mapStateToProps} from '../../src/components/FrontPage'
import {expect} from 'chai'
import {fromJS, Map} from 'immutable'

import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'

describe('FrontPage', () => {
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

    const data = {
        year: '2016',
        month: '12',
        date: '07',
        title: 'December 7, 2016',
        link: '/2016/12/07/'
    }


    it('renders a jumbotron', () => {
        const component = renderIntoDocument(
            <FrontPage latest={Map()}/>
        )

        const jumbo = scryRenderedDOMComponentsWithClass(component, 'jumbotron')
        expect(jumbo.length).to.equal(1)
    })

    it('has a title', () => {
        const component = renderIntoDocument(
            <FrontPage latest={Map()}/>
        )

        const title = scryRenderedDOMComponentsWithTag(component, 'h1')
        expect(title.length).to.equal(1)
        expect(title[0].textContent).to.equal('Fredagsmoro')
    })

    it('has an archive link', () => {
        const component = renderIntoDocument(
            <FrontPage latest={Map(data)}/>
        )

        const archive = scryRenderedDOMComponentsWithClass(component, 'archive')
        expect(archive.length).to.equal(1)
        expect(archive[0].textContent).to.equal('Browse by date')
    })

    it('has a latest link', () => {
        const component = renderIntoDocument(
            <FrontPage latest={fromJS(data)}/>
        )

        const latest = scryRenderedDOMComponentsWithClass(component, 'latest')
        expect(latest.length).to.equal(1)
        expect(latest[0].textContent).to.equal('December 7, 2016')
    })

    it('has an authors block', () => {
        const component = renderIntoDocument(
            <FrontPage latest={Map()} people={fromJS(people)}/>
        )

        const authors = scryRenderedDOMComponentsWithClass(component, 'table')
        expect(authors.length).to.equal(1)
    })

    it('maps state to correct props with no data', () => {
        const props = mapStateToProps({})

        expect(props.people).to.be.undefined
    })

    it('maps state to correct props', () => {
        const props = mapStateToProps({
            data: fromJS(Map(
                {
                    people: people
                }
            ))
        })

        expect(props.people).to.deep.equal(people)
    })

    it('maps state to correct props with date data', () => {
        const props = mapStateToProps({
            data: fromJS(Map(
                {
                    people: people,
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

        expect(props.people).to.deep.equal(people)
        expect(props.latest.toJS()).to.deep.equal(data)
    })
})



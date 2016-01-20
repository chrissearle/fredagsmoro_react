import React from 'react/addons';
import {Authors} from '../../src/components/Authors';
import {expect} from 'chai';
import {fromJS} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

describe('Footer', () => {

    const people = [
        {
            "name": "Person 1",
            "period": "Period 1",
            "avatar": "1.jpg"
        },
        {
            "name": "Person 2",
            "period": "Period 2",
            "avatar": "2.jpg"
        }
    ];

    it('renders a table', () => {
        const component = renderIntoDocument(
            <Authors people={fromJS([])} />
        );

        const table =  scryRenderedDOMComponentsWithTag(component, 'table');
        expect(table.length).to.equal(1);
    });

    it('renders the correct images', () => {
        const component = renderIntoDocument(
            <Authors people={fromJS(people)} />
        );

        const images = scryRenderedDOMComponentsWithTag(component, 'img');
        expect(images.length).to.equal(2);
        expect(images[0].src).to.equal('img/1.jpg');
        expect(images[1].src).to.equal('img/2.jpg');
        expect(images[0].alt).to.equal('Person 1');
        expect(images[1].alt).to.equal('Person 2');
    });

    it('renders a row per person', () => {
        const component = renderIntoDocument(
            <Authors people={fromJS(people)} />
        );

        const rows =  scryRenderedDOMComponentsWithTag(component, 'tr');
        expect(rows.length).to.equal(3);

        expect(rows[1].children[1].textContent).to.contain('Person 1');
        expect(rows[1].children[2].textContent).to.contain('Period 1');

        expect(rows[2].children[1].textContent).to.contain('Person 2');
        expect(rows[2].children[2].textContent).to.contain('Period 2');
    });
});
import React from 'react/addons';
import {findDOMNode} from 'react-dom'
import {NavBar} from '../../src/components/NavBar';
import {expect} from 'chai';
import {fromJS} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils;

describe('NavBar', () => {

    it('renders a navbar', () => {
        const component = renderIntoDocument(
            <NavBar/>
        );

        const navbar =  scryRenderedDOMComponentsWithTag(component, 'nav');
        expect(navbar.length).to.equal(1);
    });

    it('has a home link', () => {
        const component = renderIntoDocument(
            <NavBar/>
        );

        const brandLink = scryRenderedDOMComponentsWithClass(component, 'navbar-brand');
        expect(brandLink.length).to.equal(1);
        expect(brandLink[0].href).to.equal("/#/");
    });

    it('has an archive link', () => {
        const component = renderIntoDocument(
            <NavBar />
        );

        const archive = findDOMNode(component.refs.archive);
        expect(archive.href).to.equal("/#/archive/");
    });

    // TODO
    // Link to latest when given data
});
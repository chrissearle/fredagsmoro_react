import React from 'react/addons';
import {FrontPage} from '../../src/components/FrontPage';
import {expect} from 'chai';
import {fromJS,Map} from 'immutable';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../src/reducer';

const store = createStore(reducer);

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils;

describe('FrontPage', () => {

    it('renders a jumbotron', () => {
        const component = renderIntoDocument(
            <Provider store={store}>
                <FrontPage latest={Map()}/>
            </Provider>
        );

        const jumbo = scryRenderedDOMComponentsWithClass(component, 'jumbotron');
        expect(jumbo.length).to.equal(1);
    });

    it('has a title', () => {
        const component = renderIntoDocument(
            <Provider store={store}>
                <FrontPage latest={Map()}/>
            </Provider>
        );

        const title = scryRenderedDOMComponentsWithTag(component, 'h1');
        expect(title.length).to.equal(1);
        expect(title[0].textContent).to.equal("Fredagsmoro");
    });

    it('has an archive link', () => {
        const component = renderIntoDocument(
            <Provider store={store}>
                <FrontPage latest={Map()}/>
            </Provider>
        );

        const archive = scryRenderedDOMComponentsWithClass(component, 'archive');
        expect(archive.length).to.equal(1);
        expect(archive[0].href).to.equal("/#/archive/");
    });

    it('has a latest link', () => {
        const data = {
            year: "2016",
            month: "12",
            date: "07",
            title: "December 7, 2016",
            link: "2016/12/07/"
        };

        const component = renderIntoDocument(
            <Provider store={store}>
                <FrontPage latest={fromJS(data)}/>
            </Provider>
        );

        const latest = scryRenderedDOMComponentsWithClass(component, 'latest');
        expect(latest.length).to.equal(1);
        expect(latest[0].href).to.equal("/#/2016/12/07/");
        expect(latest[0].textContent).to.equal("December 7, 2016");
    });

    it('has an authors block', () => {
        const component = renderIntoDocument(
            <Provider store={store}>
                <FrontPage latest={Map()}/>
            </Provider>
        );

        const authors = scryRenderedDOMComponentsWithClass(component, 'table');
        expect(authors.length).to.equal(1);
    });
});

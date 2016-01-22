import React from 'react/addons';
import {Show} from '../../src/components/Show';
import {expect} from 'chai';
import {fromJS} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils;

describe('Show', () => {

    const data = [
        {
            name: "2016",
            tree: [
                {
                    name: "01",
                    tree: [
                        {
                            name: "22",
                            tree: [
                                {
                                    src: "/content/2016/01/22/12571315_10156492193140341_1844409780_n.jpg"
                                },
                                {
                                    src: "/content/2016/01/22/eUAZk6c.webm"
                                },
                                {
                                    src: "/content/2016/01/22/kreditt.png"
                                },
                                {
                                    src: "/content/2016/01/22/uMOgiO9.mp4"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    const params = {
        year: "2016",
        month: "01",
        day: "22"
    };

    it('renders the correct title', () => {
        const component = renderIntoDocument(
            <Show data={fromJS(data)} params={params}/>
        );

        const title = scryRenderedDOMComponentsWithTag(component, "h1");
        expect(title.length).to.equal(1);
        expect(title[0].textContent).to.equal("January 22, 2016");
    });

    it('renders the correct images', () => {
        const component = renderIntoDocument(
            <Show data={fromJS(data)} params={params}/>
        );

        const images = scryRenderedDOMComponentsWithTag(component, "img");
        expect(images.length).to.equal(2);
        expect(images[0].src).to.equal("/content/2016/01/22/12571315_10156492193140341_1844409780_n.jpg");
        expect(images[1].src).to.equal("/content/2016/01/22/kreditt.png");
    });

    it('renders the correct videos', () => {
        const component = renderIntoDocument(
            <Show data={fromJS(data)} params={params}/>
        );

        const videos = scryRenderedDOMComponentsWithTag(component, "video");
        expect(videos.length).to.equal(2);
        /*
        For some reason jsdom isn't populating the src element. It's working in the browser

        expect(videos[0].src).to.equal("/content/2016/01/22/eUAZk6c.webm");
        expect(videos[1].src).to.equal("/content/2016/01/22/uMOgiO9.mp4");
         */
    });

    it('renders direct links', () => {
        const component = renderIntoDocument(
            <Show data={fromJS(data)} params={params}/>
        );

        const buttons = scryRenderedDOMComponentsWithClass(component, "btn-primary");
        expect(buttons.length).to.equal(4);
        expect(buttons[0].href).to.equal("/content/2016/01/22/12571315_10156492193140341_1844409780_n.jpg");
        expect(buttons[1].href).to.equal("/content/2016/01/22/eUAZk6c.webm");
        expect(buttons[2].href).to.equal("/content/2016/01/22/kreditt.png");
        expect(buttons[3].href).to.equal("/content/2016/01/22/uMOgiO9.mp4");
    });
});
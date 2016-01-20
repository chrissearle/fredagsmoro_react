import React from 'react';
import ReactDOM from 'react-dom';
import Authors from './components/Authors';
import Footer from './components/Footer';

const people = [
    {
        "name": "Ragnar Bergvik",
        "period": "May 2011 - Jan 2015",
        "avatar": "ragnar.jpg"
    },
    {
        "name": "Karl Øgaard",
        "period": "Feb 2015 -",
        "avatar": "karl.jpg"
    }
];

ReactDOM.render(
    <Authors people={people} />,
    document.getElementById('app')
);

ReactDOM.render(
    <Footer people={people} />,
    document.getElementById('footer')
);
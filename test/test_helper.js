/* eslint-env mocha */
/* globals global, window */
import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

const doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>', {
    url: 'http://localhost'
})
const win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key]
    }
})

chai.use(chaiImmutable)
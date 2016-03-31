/* globals global, window, describe, it */

import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

const doc = jsdom.jsdom('<!doctype html><html><body><div id="navbar"></div><div id="app"></div><div id="footer"></div></body></html>', {
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
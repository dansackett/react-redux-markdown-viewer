import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom';

// To simulate the browser, we use jsdom to build a fake DOM.
// To do this we need to build the document object and window object.
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// Since the fake window object doesn't have all of the keys it needs to act
// as a real dom, we add the keys to the `global` object for use in tests.
Object.keys(window).forEach((key) => {
  if ( ! (key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);

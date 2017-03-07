'use strict';

const assert = require('assert');
const nano = require('..');

describe('Nano-seconds', () => {
  it('get nano', () => {
    const arr = nano.now();
    const now = Date.now();
    assert.equal(arr.length, 2);
    assert.equal(Math.floor(now / 1000), arr[0]);
  });

  it('get nano to string', () => {
    for (let i = 0; i < 100000; i++) {
      const ns = nano.toString();
      assert.equal(ns.length, 19);
    }
  });

  it('get difference', (done) => {
    const now = nano.now();
    setTimeout(() => {
      const diff = nano.difference(now);
      assert.equal(`${diff}`.length, 9);
      done();
    }, 100);
  });

});

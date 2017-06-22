'use strict';
const assert = require('assert');
const path = require('path');

const hrtime = process.hrtime;
global.window = {
  performance: {
    now: () => {
      const arr = hrtime();
      return ((arr[0] * 1e9) + arr[1]) / 1e6;
    },
  },
};
describe('Nano-seconds:nodejs', () => {
  const nano = require('..');
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

  it('get nano to ISOString', () => {
    const str = nano.toISOString();
    assert(str);
  });

  it('get difference', (done) => {
    const now = nano.now();
    setTimeout(() => {
      const diff = nano.difference(now);
      assert.equal(`${diff}`.length, 9);
      done();
    }, 150);
  });

});

describe('Nano-seconds:browser(performance.now)', () => {
  const moduleFile = path.join(__dirname, '../index.js');
  delete require('module')._cache[moduleFile];

  process.hrtime = null;
  const nano = require('..');
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
    }, 150);
  });

});

describe('Nano-seconds:browser(not performance.now)', () => {
  let nano = null;
  it('delay', (done) => {
    setTimeout(function() {
      const moduleFile = path.join(__dirname, '../index.js');
      delete require('module')._cache[moduleFile];
      delete global.window.performance;

      process.hrtime = null;
      nano = require('..');
      done();
    }, 1000);
  });

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
    }, 150);
  });

  it('get nano in step mode', () => {
    nano.mode = 'step';
    const arr = nano.now();
    const now = Date.now();
    assert.equal(arr.length, 2);
    assert.equal(Math.floor(now / 1000), arr[0]);
  });
});

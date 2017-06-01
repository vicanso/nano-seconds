'use strict';

const ms = Date.now();
const startSeconds = Math.floor(ms / 1000);
const startNanoseconds = (ms % 1000) * 1000 * 1000;
const oneSecond = 1000 * 1000 * 1000;
let nsCount = 0;

function nanoseconds() {
  if (exports.mode === 'step') {
    nsCount = (nsCount + 1) % 1e6;
    return nsCount;
  }
  return Math.floor(Math.random() * 1e6);
}

function browserHrtime() {
  const current = Math.floor(window.performance.now() * 1e6);
  const currentSeconds = Math.floor(current / 1e9);
  const currentNanoseconds = current % 1e9;
  return [
    currentSeconds,
    currentNanoseconds,
  ];
}

function getHrtime() {
  /* eslint no-undef:0 */
  if (window && window.performance && window.performance.now) {
    return browserHrtime();
  }
  const current = Date.now();
  const currentSeconds = Math.floor(current / 1000);
  const currentNanoseconds = ((current % 1000) * 1e6) + nanoseconds();
  return [
    currentSeconds,
    currentNanoseconds,
  ];
}

function customHrtime(time) {
  const arr = getHrtime();
  const currentSeconds = arr[0];
  const currentNanoseconds = arr[1];
  if (!time) {
    return [
      currentSeconds,
      currentNanoseconds,
    ];
  }
  let offsetSeconds = currentSeconds - time[0];
  let offsetNanoseconds = currentNanoseconds - time[1];
  if (offsetNanoseconds < 0) {
    offsetNanoseconds += 1e9;
    offsetSeconds -= 1;
  }
  return [
    offsetSeconds,
    offsetNanoseconds,
  ];
}

const hrtime = (process && process.hrtime) || customHrtime;
const start = hrtime();


function now() {
  const arr = hrtime(start);
  const value = arr[1] + startNanoseconds;
  if (value >= oneSecond) {
    return [
      startSeconds + arr[0] + 1,
      value % oneSecond,
    ];
  }
  return [
    startSeconds + arr[0],
    value,
  ];
}

function toString(arr) {
  const ns = arr || now();
  const us = `${ns[1]}`;
  const pad = '000000000'.substring(0, 9 - us.length);
  return `${ns[0]}${pad}${us}`;
}

function difference(ns, ns2) {
  const current = ns2 || now();
  const us = current[1] - ns[1];
  const s = current[0] - ns[0];
  return (s * oneSecond) + us;
}

exports.now = now;
exports.toString = toString;
exports.difference = difference;
exports.mode = 'random';

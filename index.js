'use strict';

const ms = Date.now();
const start = process.hrtime();
const currentSeconds = Math.floor(ms / 1000);
const currentUs = (ms % 1000) * 1000 * 1000;
const oneSecond = 1000 * 1000 * 1000;

function now() {
  const arr = process.hrtime(start);
  const value = arr[1] + currentUs;
  if (value >= oneSecond) {
    return [
      currentSeconds + arr[0] + 1,
      value % oneSecond,
    ];
  }
  return [
    currentSeconds + arr[0],
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

/* eslint-disable no-console */
const { EventEmitter } = require('events');

const log = new EventEmitter();

log.on('log', (event) => {
  console.log(`${new Date().toLocaleString()} | ${event}`);
});

log.on('error', (event) => {
  console.error(`${new Date().toLocaleString()} | ${event}`);
});

module.exports = { log };

#!/usr/bin/env node

const eris = require('./dist/cli/index').default;
const pkg = require('./package.json');
const config = require('./eris.json');

Object.assign(config, { version: pkg.version });

eris(config);

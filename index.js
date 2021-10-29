#!/usr/bin/env node
console.log("Welcome to CoolDates 0.1");

const axios = require('axios').default;
const { getCode, getName } = require('country-list');
const moment = require('moment');
const chalk = require('chalk');
const center = require('center-align');
const figlet = require('figlet');

#!/usr/bin/env node
console.log("Welcome to CoolDates 0.1");

const axios = require('axios').default;
const { getCode, getName } = require('country-list');
const moment = require('moment');
const chalk = require('chalk');
const center = require('center-align');
const figlet = require('figlet');



const input = process.argv.slice(2);
const today = new Date();
let year = today.getFullYear();

if (input.length > 1){
    year = input[1];
}

const setUrl = (year, countryCode) =>{
    const url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`;
    return url; 
};

const getHolidays = async () => {
    try {
        const response = await axios.get(setUrl(year,getCode(input[0])));
        return response;
    } catch (err) {
        console.error(err);
    }
};


const printHolidays = async () =>{
    try {
        const response = await getHolidays();
        console.log(center(chalk.bgGreenBright.black('Country : ' + getName(response.data[0].countryCode)),50));
        console.log(center(chalk.bgGreenBright.black('Year : ' + year + '\n'),50))
        
        response.data.forEach(res => {

            const fromNow = moment(res.date).fromNow()
            const now = moment(res.date).format("MMMM Do")
            console.log(center(`${chalk.blue(now)}\n${chalk.underline(res.name)}\n${chalk.blue(fromNow)}\n`,40))
            
        });

    } catch (err){
        console.error(err);
    }
};

figlet('Holidates', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log('\x1b[34m%s\x1b[0m',data)
});

printHolidays();

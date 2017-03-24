'use strict';
/**
 * Thank you, https://swapi.co/ :)
 */

const fs = require('fs');
const tools = require('./lib/tools');
let startUrl = 'http://swapi.co/api/planets/';

tools.makeRequest(startUrl)
    .then(
        (result) => {
            return tools.createJSONfromElements(startUrl, 1, parseInt(JSON.parse(result).count));
        },
        (error) => {
            throw new Error(error);
        })
    .then(
        (planets) => {
            console.log(planets);
            fs.writeFile('./planets.json', JSON.stringify(planets));
        },
        (error) => {
            throw new Error(error);
        })
    .catch((error) => {
        console.log(`So sad... ${error}`);
    });


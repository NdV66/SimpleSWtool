'use strict';
/**
 * Thank you, https://swapi.co/ :)
 */

const fs = require('fs');
const tools = require('./lib/other-tools');
const swapiTools = require('./lib/swapi-tools');
const wikiTools = require('./lib/wookpedia-tools');

let swapiPlanetUrl = 'http://swapi.co/api/planets/';

//tools.makeRequest(swapiPlanetUrl)
//    .then(
//        (result) => {
//            return swapiTools.createJSONfromElements(swapiPlanetUrl, 1, parseInt(JSON.parse(result).count));
//        },
//        (error) => {
//            throw new Error(error);
//        })
//    .then(
//        (planets) => {
//            console.log(planets);
//            fs.writeFile('./planets.json', JSON.stringify(planets));
//        },
//        (error) => {
//            throw new Error(error);
//        })
//    .catch((error) => {
//        console.log(`So sad... ${error}`);
//    });
wikiTools.parseElement('Tatooine');



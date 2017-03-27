'use strict';
/**
 * Thank you, https://swapi.co/
 * And http://starwars.wikia.com/wiki/  :)
 */
const fs = require('fs');
const tools = require('./lib/other-tools');
const swapiTools = require('./lib/swapi-tools');
const wikiTools = require('./lib/wookieepedia-tools');

let swapiPlanetUrl = 'http://swapi.co/api/planets/';
const pathToSave = './planets.json';

tools.makeRequest(swapiPlanetUrl)
    .then(
        (result) => {
            return swapiTools.getAllPlanetsNames(swapiPlanetUrl, parseInt(JSON.parse(result).count)); //parseInt(JSON.parse(result).count)
        },
        (error) => {
            throw new Error(error);
        })
    .then(
        (planets) => {
            return wikiTools.parseElementsToOneJSON(planets);
        },
        (error) => {
            throw new Error(error);
        })
    .then(
        (result) => {
            fs.writeFile(pathToSave, JSON.stringify(result));
            console.log('Check your file :)');
        },
        (error) => {
            throw new Error(error);
        })
    .catch((error) => {
        console.log(`So sad... ${error}`);
    });



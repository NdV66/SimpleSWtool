'use strict';
const request = require('request');
const tools = require('./other-tools');

module.exports = {
    createJSONfromElements (baseUrl, from, to) {
        let elements = [];
        let promise = new Promise(
            (resolve, reject) => {
                handlePromise(from);
                //make Promise logic sync.
                function handlePromise(number) {
                    console.log(`[SWAPItools] creating: ${number}`);
                    if(number === to) {
                        resolve(elements);
                        return;
                    }
                    let planet = tools.makeRequest(baseUrl + number);
                    planet.then(
                        (element) => {
                            elements.push(JSON.parse(element));
                            handlePromise(number + 1);
                        },
                        (error)=>{
                            reject(new Error(`Something happened: ${error}`));
                        }
                    );
                }
            }
        );
        return promise;
    },
    getAllPlanetsNames (baseUrl, max) {
        let names = [];
        let promise = new Promise(
            (resolve, reject) => {
                this.createJSONfromElements(baseUrl, 1, max)
                    .then(
                        (result) => {
                            for(let i = 0; i < result.length; i++) {
                                names.push(result[i].name);
                            }
                            resolve(names);
                        },
                        (error) => {
                            reject(new Error(`Something happened: ${error}`));
                        }
                    );
                }
        );
        return promise;
    }
};
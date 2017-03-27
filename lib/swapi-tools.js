'use strict';
const request = require('request');
const tools = require('./other-tools');

module.exports = {
    createJSONfromElements (baseUrl, from, to) {
        let elements = [];
        let promise = new Promise(
            (resolve, reject) => {
                for(let i = from; i <= to; i++) {
                    ((number) => {
                        tools.makeRequest(baseUrl + number).then(
                            (element) => {
                                elements.push(JSON.parse(element));
                                if(number === to) { //check if the last planet
                                    resolve(elements);
                                }
                            },
                            (error) => {
                                reject(new Error(`Something happened: ${error}`));
                            });
                    })(i);
                }
            }
        );
        return promise;
    }
};
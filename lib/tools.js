'use strict';
const request = require('request');

module.exports = {
    makeRequest (url) {
        let promise = new Promise(
            (resolve, reject) => {
                request({
                    url: url,
                    headers: {
                        'User-Agent': 'poor-sw-getter'
                    }
                }, function (error, response, body) {
                    if(error) {
                        reject(new Error(`Something happened: ${error}`));
                    }
                    if(response.statusCode == 200) {
                        resolve(body);
                    }
                    else {
                      reject(new Error(`Something happened: ${response.statusCode}`));
                    }
                  });
            }
        );
        return promise;
    },
    createJSONfromElements (baseUrl, from, to) {
        let elements = [];
        let promise = new Promise(
            (resolve, reject) => {
                for(let i = from; i <= to; i++) {
                    ((number) => {
                        this.makeRequest(baseUrl + number).then(
                            (planet) => {
                                elements.push(JSON.parse(planet));
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
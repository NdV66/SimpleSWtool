'use strict';
const request = require('request');

module.exports = {
    createJSONkey(text) {
        return text.replace(/\s/g, '_').toLowerCase();
    },
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
    }
};


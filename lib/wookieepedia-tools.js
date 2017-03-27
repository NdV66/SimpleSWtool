'use strict';
const tools = require('./other-tools');
const cheerio = require('cheerio');
const fs = require('fs');
const baseUrl = 'http://starwars.wikia.com/wiki/';


module.exports = {
    //parse one element (left "table")
    // @param elementName - name like on wookpedia
    parseElement(elementName) {
        let promise = new Promise(
            (resolve, reject) => {
                tools.makeRequest(baseUrl + elementName)
                    .then(
                        (html) => {
                           let $ = cheerio.load(html);
                           let element = {};
                           element['name'] = elementName;
                           //Create data from ul
                           function readFromUl(ul) {
                                let array = [];
                                ul.children('li').each(function () {
                                    array.push( $(this).children('a').text());
                                });
                                return array;
                            }
                            //create data from "table" in JSON format - if ul, then create array inside
                           $('.pi-group').each(function () {
                                const subName = tools.createJSONkey($(this).children('h2').text());
                                element[subName] = {};

                                $(this).children('.pi-data').each(function () {
                                    let info = null;
                                    let piDataValue = $(this).children('.pi-data-value');
                                    let ul = piDataValue.children('ul');

                                    if(ul.length > 0) {
                                        info = readFromUl.call(this, ul);
                                    } else {
                                        info = piDataValue.text().replace(/\[\d+\]/g, '');
                                    }
                                    element[subName][tools.createJSONkey($(this).children('.pi-data-label').text())] = info;
                                });
                           });
                           resolve(element);
                        },
                        (error) => {
                            reject(new Error(`Something happened: ${error}`));
                        }
                    );
            }
        );
        return promise;
    },
    //Get all ements and make it together
    //@param namesArray array of element's names
    parseElementsToOneJSON(namesArray) {
        let that = this;
        let promise = new Promise(
            (resolve, reject) => {
                let result = [];
                handlePromise(0);
                //make Promise logic sync.
                function handlePromise(number) {
                    if(number === namesArray.length) {
                        resolve(result);
                        return;
                    }
                    console.log(`Adding element: ${number}`);
                    let planet = that.parseElement(namesArray[number]);
                    planet.then(
                        (element) => {
                            result.push(element);
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
    }
};
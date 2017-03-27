'use strict';
const tools = require('./other-tools');
const cheerio = require('cheerio');
const fs = require('fs');
const baseUrl = 'http://starwars.wikia.com/wiki/';


module.exports = {
    //parse one element (left "table")
    // @param elementName - name like on wookpedia
    parseElement(elementName) {
        tools.makeRequest(baseUrl + elementName)
            .then(
                (html) => {
                   let $ = cheerio.load(html);
                   let element = {};

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

                           if(ul.length >= 1) {
                               info = readFromUl.call(this, ul);
                           } else {
                               info = piDataValue.text().replace(/\[\d+\]/g, '');
                           }
                           element[subName][tools.createJSONkey($(this).children('.pi-data-label').text())] = info;
                       });

                   });
                   console.log(JSON.stringify(element));
                },
                (error) => {
                    throw new Error(error);
                }
            )
            .catch((error) => {
               console.log(`So sad... ${error}`);
           });;
    }
};
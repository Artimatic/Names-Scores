"use strict";

const fs = require('fs');
const assert = require('assert');

class NameScore {

    /*
    * Reads a given file
    * @param {string} filename - name of file to read
    * @return {string}
    */
    load(filename) {
        return new Promise(function(resolve, reject) {
            fs.readFile(filename, 'utf8', function(err, data){
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }

    /*
    * Parses a large string and returns an array of names
    * @param {string} data - String of names
    * @return {string[]}
    */
    parse(data) {
        //Remove instances of \" then convert to uppercase so we don't have to deal with casing then split into array delimited by \,
        return data.replace(/"/g, '').toUpperCase().split(',');
    }

    sort() {

    }

    defaultSort(array) {
        return array.sort();
    }

    /*
    * This calculates the total score for an array of names
    * @param {string[]} arr - Array of names
    * @param {Object} rule - Object containing scoring rule
    * @return {Number}
    */
    getScore(arr, rule) {
        var calcAlphValue = (value) => {
            var score = 0;
            for(var i = 0; i < value.length; i++) {
                score += rule[value[i]];
            }
            return score;
        };

        return arr.reduce((acc, value, idx) => {
            acc += (idx+1)*calcAlphValue(value);
            return acc;
        }, 0);
    }
}

var main = () => {
    var sortedList  = null,
        filename    = null,
        scoringRule = {'A': 1,'B': 2,'C': 3,'D': 4,'E': 5,'F': 6,'G': 7,'H': 8,'I': 9,'J': 10,'K': 11,'L': 12,'M': 13,'N': 14,
                        'O': 15,'P': 16,'Q': 17,'R': 18,'S': 19,'T': 20,'U': 21,'V': 22,'W': 23,'X': 24,'Y': 25,'Z': 26};

    var score = new NameScore();

    if (process.argv.length === 3) {
        filename = process.argv[2];
    } else {
        filename = '../p1/p022_names.txt';
    }

    score.load(filename) //Read file
        .then(score.parse) //Parse the data
        .then(score.defaultSort) //Sort the names with javascript default sort algo
        .then((list) => sortedList = list) //Set list
        .then(() => score.getScore(sortedList, scoringRule)) //Calculate score
        .then((score) => console.log(score)) //Print score
        .catch((err) => console.log(err)); //Print error

    //Test cases

    //Should read and parse correctly

    //Should sort correctly
    var sortTest = score.defaultSort(['COLIN', 'ABC']);
    assert(sortTest[0] == 'ABC', 'sort incorrect');
    assert(sortTest[1] == 'COLIN', 'sort incorrect');

    //Should score correctly
    var testScore1Result = 1*53 + 2*6;
    var score1 = score.getScore(['COLIN', 'ABC'], scoringRule);
    assert(score1 === testScore1Result, 'score incorrect');
};

main();

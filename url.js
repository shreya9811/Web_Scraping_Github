const request = require('request');
const cheerio = require('cheerio');
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
console.log('Before');
request(url, cb);
function cb(err, res, html) {
    if(err){
        console.log(err);
    } else {
        extractHTML(html)
    }
}
function extractHTML(html) {

    let $ = cheerio.load(html);
    // console.log($);
    let lol = $('.ds-ml-4.ds-text-typo-mid1');
    // console.log(lol.text());
    // console.log(JSON.parse(lol), 's');
    // let elements = $(".ci-html-content");

    let textData = $(lol[0].children)
    // let htmlData = $(lol[0]).html();

    console.log("text ", textData);
    // console.log(htmlData);
    
}
console.log('After');
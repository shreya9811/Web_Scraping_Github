const request = require('request');
const cheerio = require('cheerio');
const getIssuesHtml = require('./issues')

function getReposPageHtml(url, topic) {
    request(url, cb);
    function cb(err, res, html){
        if(err) {
            console.log(err);
        }else if(res.statusCode == 404){
            console.log('page not found');
        }
         else {
            getReposLink(html);
        }
    }
    function getReposLink(html){
        let $ = cheerio.load(html);
        let headingsArr = $('.f3.color-fg-muted.text-normal.lh-condensed');
        console.log(topic);
        for(let i =0 ; i< 8; i++){
            let twoAnchors = $(headingsArr[i]).find('a');
            let link = $(twoAnchors[1]).attr('href');
            let fullLink = `https://github.com${link}/issues`;
            // console.log(fullLink);
            let repoName = link.split('/').pop();
            getIssuesHtml(fullLink, topic, repoName);

        }
        console.log('************************************');
    }
}
module.exports = getReposPageHtml;
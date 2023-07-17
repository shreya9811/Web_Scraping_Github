let url = "https://github.com/topics";
const request = require('request');
const cheerio = require('cheerio');
const getReposPageHtml = require('./reposPage')
request(url, cb);
function cb( err,res,html){
    if(err){
        console.log(err);
    } else if(res.statusCode == 404){
        console.log('page not found');
    } 
    else{
        getTopicLink(html)
    }
}
function getTopicLink(html) {
    let $ = cheerio.load(html);
    let linkElementArr = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for(let i = 0 ;i< linkElementArr.length; i++)
{
    let href= $(linkElementArr[i]).attr('href');
    let topic = href.split('/').pop();
    let fullLink = `https://github.com/${href}`;
    getReposPageHtml(fullLink, topic);

}}
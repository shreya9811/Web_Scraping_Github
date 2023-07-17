let url = "https://github.com/topics";
const request = require('request');
const cheerio = require('cheerio');
const fs= require('fs');
const path= require('path');
const pdfkit = require('pdfkit');

function getIssuesHtml(url, topic, repoName) {
request(url, cb);
function cb( err,res,html){
    if(err){
        console.log(err);
    } else if(res.statusCode == 404){
        console.log('page not found');
    }
     else{
        // console.log(html);
        getIssues(html)

    }
}
function getIssues(html){
    let $  = cheerio.load(html);
    let issuesArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    // console.log(issuesArr.length);
    let arr = [];
    for(let i = 0 ;i < issuesArr.length; i++){
        let link = $(issuesArr[i]).attr('href');
        arr.push(link);
        // console.log(link);
    }
    //topic folder, repo file, arr content
    // console.log(topic,"      ", arr);
    let folderPath = path.join(__dirname, topic); //current folder mein topic
    dirCreator(folderPath);
    let filePath = path.join(folderPath, repoName + ".pdf");
    console.log(filePath);
    let text = JSON.stringify(arr);
let pdfDoc = new pdfkit();
pdfDoc.pipe(fs.createWriteStream(filePath));
pdfDoc.text(text);
pdfDoc.end();

    // fs.writeFileSync(filePath, JSON.stringify(arr)); //always write json data in string

    //convert json text to pdf

}

}
module.exports = getIssuesHtml;
function dirCreator(folderPath){
   if(fs.existsSync(folderPath) == false){
    fs.mkdirSync(folderPath)
   }
}
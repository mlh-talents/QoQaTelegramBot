const request = require('request');
const cheerio = require('cheerio');

/*
* @param language: can be either 'de' or 'fr'. default is 'de'.
*/
function scrapeThisShit(language = 'de') {
  request({
    uri: "http://www.qoqa.ch/" + language,
  }, function(error, response, body) {
    var $ = cheerio.load(body);

    var text = $("title").text().replace('QoQa.ch | ', '');
    console.log(text);
    
    var src = $('#showcase_media_DESKTOP_0').attr("src");
    console.log(src);
  });
}


scrapeThisShit();

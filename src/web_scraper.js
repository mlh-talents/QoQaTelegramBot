'use strict';

const request = require('request');
const cheerio = require('cheerio');

var webscrappermodule = {
  /*
  * @param language: can be either 'de' or 'fr'. default is 'de'.
  */
  scrapeThisShit: function(language = 'de', callback) {
    var data;
    request({
      uri: "http://www.qoqa.ch/" + language },
      function(error, response, body) {
        var $ = cheerio.load(body);

        var title = $("title").text().replace('QoQa.ch | ', '');
        console.log(title);

        var src = $('#showcase_media_DESKTOP_0').attr("src");
        console.log(src);

        data = {title:title, image:src};
        callback(data);
    });
    console.log("web_scraper: scraping finished " + data);
    return data;
  }
}
module.exports = webscrappermodule;

'use strict';

const request = require('request');
const cheerio = require('cheerio');

var webscrappermodule = {
  /*
  * @param language: can be either 'de' or 'fr'. default is 'de'.
  */
  scrapeThisShit: function(language = 'de') {
    request({
      uri: "http://www.qoqa.ch/" + language },
      function(error, response, body) {
        var $ = cheerio.load(body);

        var text = $("title").text().replace('QoQa.ch | ', '');
        console.log(text);

        var src = $('#showcase_media_DESKTOP_0').attr("src");
        console.log(src);
    });
  }
}
module.exports = webscrappermodule;

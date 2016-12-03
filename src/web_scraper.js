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
        var qoqaPrice = 'QoQa Preis: ' + $(".qoqa-price").first().text().replace(/\s/g, '');
        var normalPrice = 'Richtpreis: ' + $("div[class=price]").first().text().replace(/\s/g, '');
        // TODO: fix
        //var cheapestPrice = 'Cheapest price: ' + $("div[class=price]").next().next().text().replace(/\s/g, '');
        var link = 'Jetzt zuschlagen: qoqa.ch/' + language;
        var caption = title + '\n'
                      + qoqaPrice + '\n'
                      + normalPrice + '\n'
                      //+ cheapestPrice + '\n'
                      + link;
        console.log("DEBUG:::::" + caption);

        var src = $('#showcase_media_DESKTOP_0').attr("src");
        console.log(src);

        data = {title:caption, image:src};
        callback(data);
    });
    console.log("web_scraper: scraping finished " + data);
    return data;
  }
}
module.exports = webscrappermodule;

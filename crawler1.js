var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://www.google.com";
console.log("Página visitada " + pageToVisit);
request(pageToVisit, function(error, response, body) {
   if(error) {
     console.log("Erro: " + error);
   }
   // Check status code (200 is HTTP OK)
   console.log("Status: " + response.statusCode);
   if(response.statusCode === 200) {
     // Parse the document body
     var $ = cheerio.load(body);
     console.log("Título da página: " + $('title').text());
   }
});

function searchForWord($, word) {
  var bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}

function collectInternalLinks($) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
      allRelativeLinks.push($(this).attr('href'));

  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Encontrados " + allRelativeLinks.length + " links relativos.");
  console.log("Encontrados " + allAbsoluteLinks.length + " links absolutos.");
}
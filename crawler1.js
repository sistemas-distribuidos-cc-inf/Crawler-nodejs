var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var START_URL = "http://www.google.com";
var SEARCH_WORD = "ornitorrinco";
var MAX_PAGES_TO_VISIT = 50;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);
crawl();

function crawl() {
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Limite de páginas alcançado.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage in pagesVisited) {
    // Se a página já foi visitada, chamamos novamente o crawler
    crawl();
  } else {
    // Se a página ainda não foi visitada
    visitPage(nextPage, crawl);
  }
}

function visitPage(url, callback) {
  // Adiciona a página
  pagesVisited[url] = true;
  numPagesVisited++;

  console.log("Visitando a página " + url);
  request(url, function(error, response, body) {
     // Status (200 - HTTP OK)
     console.log("Status: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Verifica o corpo da página
     var $ = cheerio.load(body);
     var isWordFound = searchForWord($, SEARCH_WORD);
     console.log("Título da Página: " + $('title').text());
     if(isWordFound) {
       console.log('A palavra ' + SEARCH_WORD + ' foi encontrada na página ' + url);
       console.log('Quantidade de páginas visitadas: '+numPagesVisited)
     } else {
       collectInternalLinks($);
       callback();
     }
  });
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Encontrados " + relativeLinks.length + " links relativos na página.");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });

}

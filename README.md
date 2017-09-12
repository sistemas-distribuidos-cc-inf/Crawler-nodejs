# Crawler-nodejs
Desenvolvimento de um Crawler simples utilizando a linguagem nodejs

A ideia é desenvolver um Crawler simples, que visita uma URL e seus "sub-links" em busca de uma palavra, assim que esta palavra for encontrada, é informado ao usuário em que URL a palavra foi encontrada, e quantas páginas foram visitadas.

Necessária a inclusão das bibliotecas "request" para fazer solicitações ao HTML, "cheerio" para analisar e solicitar os elementos HTML e "url-parse" para analisar as URL's.

Nas linhas 5,6,7 temos respectivamente as variáveis "START_URL" onde é definida a URL a ser pesquisada, "SEARCH_WORD" onde é definida a palavra ser procurada e "MAX_PAGES_TO_VISIT" onde é definido o número máximo de páginas a ser verificado.

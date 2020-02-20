const http = require('http'),
fs = require('fs'),
url = require ('');

http.createServer((request,response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

if (q.pathname.includes('documentation')) {
  filePath = (__dirname + '/Users/mollydeangelis-jimenez/careerfoundry/movie_api/documentation.html');
} else {
  filePath ='index.html';
}

fs.readFile('/Users/mollydeangelis-jimenez/careerfoundry/movie_api/log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',  function(err,data) {
  if (err) {
    throw err;
  }

response.writeHead(200, { 'Content-type': 'text/html'});
respond.write(data);
response.end();
});

}).listen(8080);

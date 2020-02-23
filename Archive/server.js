const http = require('http');
const fs = require('fs');
const url = require('url');


http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello Molly!');

  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath ='index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',  function(err,data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  })
  response.end();
}).listen(8080)

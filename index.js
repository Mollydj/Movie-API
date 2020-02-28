const http = require('http'),
  url = require('url');

http.createServer((request, response) => {{
  var requestURL = request.url;
  if ( requestURL.pathname == "documentation.html")
      response.writeHead(200, {'Content-Type': 'text/plain'};
      response.end('Documentation on the bookclub API.\n');
        } else {
          response.writeHead(200, {'Content-type': 'text/plain'});
          response.end('Welcome to my book club!\n');
                }
}).listen(8080);

console.log('My first Node test server is running on port 8080.');

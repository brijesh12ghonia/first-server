const http = require('http');

const port = 8081;

http.createServer((require, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    response.write('<h1>Hello!! This is from my server</h1>');
    response.end();
}).listen(port, () => {
    console.log(`NodeJS listening on port ${port}`);
});
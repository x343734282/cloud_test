/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-08-07 15:50:53
 * @version $Id$
 */

const http = require('http');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

const url = require('url');

const server = http.createServer((req, res) => {
	console.log('url:' + req.url);
	proxy.web(req, res, {
		target: url.parse(req.url)
	});
});

server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(process.env.PORT||8080);
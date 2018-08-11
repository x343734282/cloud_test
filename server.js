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

const server = http.createServer(function(req, res) {
	console.log('url:' + req.url);

	var parsedUrl = url.parse(req.url);
	var finalAgent = null;

	if (parsedUrl.protocol === 'https:') {
		finalAgent = https.globalAgent;
	} else {
		finalAgent = http.globalAgent;
	}

	proxy.web(req, res, {
		target: parsedUrl,
		agent: finalAgent,
		headers: {
			host: parsedUrl.hostname
		},
		prependPath: false,
		xfwd: true,
		hostRewrite: parsedUrl.host,
		protocolRewrite: parsedUrl.protocol
	});
});

proxy.on('error', function(e) {
	console.log(JSON.stringify('proxy error: ' + e));
});

server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(process.env.PORT || 7080, function() {
	console.log('listening on 8080.');
});
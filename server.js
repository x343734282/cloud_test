/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-08-07 15:50:53
 * @version $Id$
 */

const http = require('http');

const server = http.createServer((req, res) => {
	res.write('hello word');
	res.end();
});
server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(process.env.PORT||8080);
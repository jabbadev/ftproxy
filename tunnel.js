
var http = require('http');
var port = process.env.PORT||5000,proxySocket = null;
var tunnel = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><head></head><body><p>listening running</p></body></html>\n');
  console.log(proxySocket);
});

tunnel.on('connect',function(req,cltSocket){
	console.log('connect from the client ...');
});

tunnel.listen(5000,'127.0.0.1',function(){
	var proxy,
	proxyOpt = {
		host: "10.0.2.2",
		port: 3128,
		method: "CONNECT",
		path: 'www.google.com:80'
	},
	req = http.request(proxyOpt);
	req.end();
	
	req.on('connect',function(res,_proxySocket){
		proxySocket = _proxySocket;
		console.log('connection  established with proxy ...');
	});
	
});

console.log('Server running at http://localhost:' + port );

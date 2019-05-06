var http = require('http');
var url = require('url')
var fs = require('fs');
var path = require('path');

// var index = fs.createReadStream('index.html');

http.createServer(function (req, res) {
  var requestUrl = url.parse(req.url);
  console.log('Request', requestUrl);

  const { pathname } = requestUrl;
  const index = pathname === '/';
  const ext = index || pathname.split('.')[1];
  const fileName = index ? '/index.html' : pathname;
  const filePath = path.join(__dirname, path.sep, fileName)
  const file = fs.existsSync(filePath) && filePath;
  if (!file) {
    console.log(`File not found ${fileName}`);
  }
  let contentTypes = {
    true: 'text/html',
    'ico': 'image/vnd.microsoft.icon',
    'js': 'text/javascript',
    'html': 'text/html',
    'css': 'text/css',
    'json': 'application/json'
  };
  console.log('filepath', filePath);
  console.log('contentType', ext, contentTypes[ext]);

  res.writeHead(200, { 'Content-Type': contentTypes[ext] });
  fs.createReadStream(file).pipe(res)
}).listen(80);
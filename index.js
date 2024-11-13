const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = "." + (q.pathname === "/" ? "/index.html" : q.pathname + ".html");

    fs.readFile(filename, function(err, data) {
        if (err) {
            // Handle 404 by reading and serving the 404.html file
            fs.readFile("./404.html", function(error, data404) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(data404);
                return res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);

const http = require('http');
const director = require('director');
const bot = require('./bot.js');

const router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: bot.describe
  }
});

const server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

const port = Number(process.env.PORT || 8000);
server.listen(port);

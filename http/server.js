const http = require('http');
const fs = require('fs');
const url = require('url');
const chalk = require('chalk');

const _PORT = 9009;
const headerContent = {'Content-Type': 'text/html'};
const isIndex = (pathName) => {
  return pathName === '/' ? '/index.html' : pathName;
};
const errorPage = (res) => {
  let data = fs.readFileSync('error.html');
    res.writeHead(200, headerContent);
    res.write(data.toString());
};
const serverHandler = (req, res) => {
  let pathName = url.parse(req.url).pathname;
  console.log(`Requesting for ${pathName}`);

  fs.readFile(isIndex(pathName).substr(1), function (err, data) {
    if(err){
      console.log(chalk.red(err));
      console.log(`HTTP Status: ${chalk.red(404)}`);
      res.writeHead(404, headerContent);
      errorPage(res);
    }
    else{
      console.log(`HTTP Status: ${chalk.green(200)}`);
      res.writeHead(200, headerContent);
      res.write(data.toString());
    }
    res.end();
  });
};

http.createServer(serverHandler).listen(_PORT);
console.log(`${ chalk.bgYellow.blue("NodeJS Server running at localhost: ") }${chalk.bgBlack.magenta(_PORT)}`);

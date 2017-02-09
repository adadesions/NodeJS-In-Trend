const http = require('http');
const fs = require('fs');
const url = require('url');
const chalk = require('chalk');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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

if(cluster.isMaster){
  console.log(chalk.bgWhite.green(`Master pid [${process.pid}] is running`));

  for(let i=0; i<numCPUs; i++){
    cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  }
}
else {
  http.createServer(serverHandler).listen(_PORT);
  console.log(`${ chalk.bgYellow.blue("NodeJS Server running at localhost: ") }${chalk.bgBlack.magenta(_PORT)}`);
  console.log(chalk.bgWhite.green(`Worker ${process.pid} started`));

}

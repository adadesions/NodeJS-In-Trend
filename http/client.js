const http = require('http');
const chalk = require('chalk');
const option = {
  host: 'localhost',
  port: '9009',
  path: '/'
}

let req;
const shot = setInterval(() => {
  req = http.request(option, (res) => {
    res.on('data', () => {
      console.log(chalk.bgWhite.red("Fired!!"));
    });
  });
  req.end();
}, 1000);

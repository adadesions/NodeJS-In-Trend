// Client
let net = require('net');
let option = {
  host: 'localhost',
  port: '9009',
}

let client = new net.Socket();
let i = 0;
client.connect(option, function () {
  console.log("Conneted");
  let interval = setInterval(()=>{
    client.write(`Couting ${i++}`);
    if( i >= 5){
      clearInterval(interval);
      client.end();
    }
  }, 1000);

});

client.on('data', (data) => {
  console.log(`Recieved: ${data}`);
});

client.on('close', () => {
  console.log("Disconnected");
});

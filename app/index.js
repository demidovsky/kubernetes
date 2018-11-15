const express = require('express');
const path = require('path');
const fork = require('child_process').fork;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/load', (req, res) => {
  const workerPath = path.join(__dirname, 'worker.js');
  const worker = fork(workerPath);
  console.info('Started worker.');

  worker.on('message', ({ json }) => {
    res.send(json);
    worker.kill();
  });

  worker.send({});
});

app.listen(3000, () => { console.log('Listening to http://localhost:3000'); });



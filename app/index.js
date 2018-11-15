const express = require('express');
const path = require('path');
const { fork } = require('child_process');
const { RateLimiter } = require('limiter');

const limiter = new RateLimiter(5, 'second');

function checkRate(res) {
  if (limiter.tryRemoveTokens(1)) {
    return true;
  } else {
    console.log('Rate limit exceeded.');
    res.status(429);
    res.send('Too many requests');
    return false;
  }
}

const app = express();

app.get('/load', (req, res) => {
  if (!checkRate(res)) return;

  const workerPath = path.join(__dirname, 'worker.js');
  const worker = fork(workerPath);
  console.info('Started worker.');

  worker.on('message', ({ json }) => {
    res.send(json);
    worker.kill();
  });

  worker.send({});
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => { console.log('Listening to http://localhost:3000'); });


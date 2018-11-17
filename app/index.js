const express = require('express');
const path = require('path');
const { fork } = require('child_process');
const { RateLimiter } = require('limiter');
const Queue = require('bull');

const app = express();
const limiter = new RateLimiter(10, 'second');
const queue = new Queue('playground', 'redis://10.59.241.112:6379');

queue.process(async (job) => {
  const workerPath = path.join(__dirname, 'worker.js');
  const worker = fork(workerPath);

  return new Promise((resolve, reject) => {
    worker.on('message', ({ json }) => {
      worker.kill();
      resolve(json);
    });
    worker.send({});
  });
});

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

app.get('/', (req, res) => res.send('Hello World!'));

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

app.get('/queue', async (req, res) => {
  if (!checkRate(res)) return;
  const job = await queue.add({});
  const result = await job.finished();
  res.send(result);
});

app.listen(3000, () => { console.log('Listening to http://localhost:3000'); });


const fs = require('fs');
const path = require('path');
const parseXML = require('./parseXML');

process.on('message', () => {
  const file = fs.readFileSync(path.join(__dirname, 'files', 'large.xml'));
  const json = parseXML(file);

  process.send({ json });
});





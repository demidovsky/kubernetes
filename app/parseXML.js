const converter = require('xml-js');

const options = {
  attributesKey: '$',
  textKey: '_',
  compact: true,
  // alwaysArray: true
};

function parseXML(xml) {
  return converter.xml2js(xml, options);
}

module.exports = parseXML;

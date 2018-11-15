const converter = require('xml-js');

function parseXML (xml) {
  const options = {
    attributesKey: '$',
    textKey: '_',
    compact: true,
    // alwaysArray: true
  };

  return converter.xml2js(xml, options);
}

module.exports = parseXML;

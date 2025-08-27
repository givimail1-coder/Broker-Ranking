const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const filePath = path.join(__dirname, '../../broker-data.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return {
      statusCode: 200,
      body: 'Broker data saved!',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error: ' + err.message,
    };
  }
};

// app.js
const express = require('express');
const fs = require('fs');
const app = express();

const dataDirectory = '/tmp/data/';

app.get('/data', (req, res) => {
  const fileName = req.query.n;
  const lineNumber = req.query.m;

  if (!fileName) {
    return res.status(400).send('Missing "n" parameter');
  }

  const filePath = dataDirectory + fileName + '.txt';

  if (lineNumber) {
    // Return specific line from the file
    const content = getLineFromFile(filePath, lineNumber);
    res.send(content);
  } else {
    // Return entire content of the file
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      res.send(content);
    });
  }
});

function getLineFromFile(filePath, lineNumber) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  return lines[lineNumber - 1] || 'Line not found';
}

const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

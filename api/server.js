const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});
const port = 3000;

app.use(express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/bingo', (req, res) => {
    const isLargeBingo = req.body['input15'] !== undefined;
    const size = isLargeBingo ? 5 : 3;
    const bingoArray = [];
    for(let i = 1; i <= size * size; i++){
      bingoArray[i - 1] = req.body['input' + i];
    }
    const bingoNumbersJSON = JSON.stringify(bingoArray);

    let tableHTML = '<table>';
    for(let i = 0; i < size; i++){
      tableHTML += '<tr>';
      for(let j = 0; j < size; j++){
        tableHTML += `<td>${bingoArray[i * size + j]}</td>`;
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
  
    res.render('bingo', {
      bingoNumbersJSON: bingoNumbersJSON,
      tableHTML: tableHTML
    });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
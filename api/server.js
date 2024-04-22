const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

const pgp = require('pg-promise')()
const db = pgp('postgres://swingoadmin:FcGCCrK8W4cV5GEgbC7NDaYCVoLz9aPT@dpg-coj3o4ol5elc73dh407g-a.frankfurt-postgres.render.com/swingo')
/*
db.one('SELECT * AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
  */

db.connect()
.then((obj) => {
  obj.done(); // success, release the connection...
})
.catch((error) => {
console.log('ERROR:', error.message || error);
});
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
    shuffleArray(bingoArray);
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
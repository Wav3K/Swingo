const associatedTabJSON = document.getElementById('dane').getAttribute('data-associated-tab');
const associatedTab = JSON.parse(associatedTabJSON);
const table = document.querySelector("table");

const isBig = Boolean(associatedTab[15]);
const size = isBig ? 5 : 3;

function createTable(size) {
    table.innerHTML = '';
    for (let i = 0; i < size; i++) {
        let rowHTML = '';
        for (let j = 0; j < size; j++) {
            rowHTML += `<td id="${i * size + j + 1}" style="border: 1px solid black;"></td>`;
        }
        table.innerHTML += `<tr>${rowHTML}</tr>`;
    }
}
createTable(size);
associatedTab.forEach((value, i) => {
    const cell = document.getElementById(i + 1);
    cell.innerHTML = value;
    cell.addEventListener('click', function() {
        if (this.style.backgroundColor === 'red') {
            this.style.backgroundColor = '';
        } else {
            this.style.backgroundColor = 'red';
        }
        checkBingo(size);
    });
});

function checkBingo(size) {
    const rows = Array.from(table.rows);
    const isRowBingo = rows.some(row => Array.from(row.cells).every(cell => cell.style.backgroundColor === 'red'));
    const isColumnBingo = Array.from(rows[0].cells).some((_, i) => rows.every(row => row.cells[i].style.backgroundColor === 'red'));
    const isDiagonalBingo = [0, size - 1].some((start, index) => rows.every((row, i) => row.cells[start === 0 ? i : size - 1 - i].style.backgroundColor === 'red'));
    const resultBingo = document.querySelector('#resultBingo');

    if (isRowBingo || isColumnBingo || isDiagonalBingo) {
        resultBingo.textContent = 'Bingo!!!';
    } else {
        resultBingo.textContent = ''; 
    }
}

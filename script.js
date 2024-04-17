function createInputs(size){
    if (!size) {
        alert('Please select a size');
        return;
    }
    var inputs = document.querySelector('[name="inputs"]');
    if(inputs.childElementCount!=0){
        inputs.innerHTML = null;
    }
    for(i=1;i<=size*size;i++) {
        var inp = document.createElement("input");
        inp.name = "input"+i;
        inp.style = "display: block;";
        inp.required = true;
        inputs.appendChild(inp);
    }
    document.querySelector("#submitBtn").disabled = false;
}

function saveValues() {
    const inputs = document.querySelectorAll('[name="inputs"] input');
    const values = Array.from(inputs).map(input => input.value);
    const saveName = document.querySelector('#saveName').value;
    if (saveName) {
        localStorage.setItem(saveName, JSON.stringify(values));
        updateSelectOptions();
    }
}


function updateSelectOptions() {
    const select = document.querySelector('#savedSets');
    select.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.appendChild(option);
    }
}

function loadValues() {
    const select = document.querySelector('#savedSets');
    const savedValues = JSON.parse(localStorage.getItem(select.value));
    const inputs = document.querySelectorAll('[name="inputs"] input');
    savedValues.forEach((value, i) => {
        if (inputs[i]) {
            inputs[i].value = value;
        }
    });
}

function deleteValues() {
    const select = document.querySelector('#savedSets');
    localStorage.removeItem(select.value);
    updateSelectOptions();
}

window.onload = function() {
    updateSelectOptions();
};

function downloadPreset() {
    const select = document.querySelector('#savedSets');
    const savedValues = JSON.parse(localStorage.getItem(select.value));
    if (savedValues) {
        const blob = new Blob([JSON.stringify(savedValues)], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = select.value + '.txt';
        link.href = url;
        link.click();
    } else {
        alert('No preset selected');
    }
}
function uploadPreset(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const values = JSON.parse(e.target.result);
        const inputs = document.querySelectorAll('[name="inputs"] input');
        values.forEach((value, i) => {
            if (inputs[i]) {
                inputs[i].value = value;
            }
        });
    };
    reader.readAsText(file);
}

// let mode = 'daily';
// let counter = 0;

// window.onload = function() {
//     const lastCreationDate = localStorage.getItem(mode + 'CreationDate');
//     const currentDate = new Date().toISOString().split('T')[0];

//     if (lastCreationDate === currentDate && counter === 0) {
//         const bingo = localStorage.getItem(mode + 'Bingo');
//         if (bingo) {
//             displayBingo(JSON.parse(bingo));
//         }
//     } else {
//         checkBingoCreation();
//     }
//     counter++
// }

// function checkBingoCreation() {
//     const lastCreationDate = localStorage.getItem(mode + 'CreationDate');
//     const currentDate = new Date().toISOString().split('T')[0];
//     const submitBtn = document.getElementById('submitBtn');

//     if (lastCreationDate === currentDate) {
//         submitBtn.disabled = true;
//     } else {
//         submitBtn.disabled = false;
//     }
// }

// document.querySelector('form').addEventListener('submit', function() {
//     const currentDate = new Date().toISOString().split('T')[0];
//     localStorage.setItem(mode + 'CreationDate', currentDate);
//     const inputs = document.querySelectorAll('[name="inputs"] input');
//     const values = Array.from(inputs).map(input => input.value);
//     localStorage.setItem(mode + 'Bingo', JSON.stringify(values));
// });

// function displayBingo(bingo) {
//     const form = document.createElement('form');
//     form.method = 'post';
//     form.action = 'bingo.php';

//     for (let i = 0; i < bingo.length; i++) {
//         const hiddenField = document.createElement('input');
//         hiddenField.type = 'hidden';
//         hiddenField.name = 'input' + (i + 1);
//         hiddenField.value = bingo[i];
//         form.appendChild(hiddenField);
//     }
//     document.getElementById('dane').setAttribute("data-associated-tab", JSON.stringify(bingo));
//     document.body.appendChild(form);
//     form.submit();
// } 
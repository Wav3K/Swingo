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


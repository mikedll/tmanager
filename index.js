// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.newAgentForm').addEventListener('submit', (e) => {

    e.stopPropagation();
    e.preventDefault();


    var nameN = e.target.querySelector('input[id="name"]');
    var ageN = e.target.querySelector('input[id="age"]');

    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var t1 = document.createTextNode(nameN.value);
    td1.appendChild(t1);

    var td2 = document.createElement('td');
    var ageInt = parseInt(ageN.value);
    if(isNaN(ageInt)) ageInt = '';
    t1 = document.createTextNode(ageInt);
    td2.appendChild(t1);

    tr.appendChild(td1);
    tr.appendChild(td2);

    var p = document.querySelector('.cli-list tbody');
    p.appendChild(tr);

    nameN.value = "";
    ageN.value = "";

    return false;
  });


});

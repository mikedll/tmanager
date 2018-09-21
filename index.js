// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

const { desktopCapturer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {

  desktopCapturer.getSources({types: ['screen']}, (error, sources) => {
    if(error) throw error;

    for (let i = 0; i < sources.length; ++i) {
      console.log(sources[i]);
      if (i == 0) {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id
            }
          }
        }).then((stream) => handleStream(stream))
        .catch((e) => handleError(e));

        return;
      }
    }
  });

  function handleStream(stream) {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
  }

  function handleError(e) {
    console.log(e);
  }

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

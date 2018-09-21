// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

const { desktopCapturer } = require('electron');
const fs = require('fs');

document.addEventListener('DOMContentLoaded', () => {

  const dbFile = 'store.txt';

  function addPerson(name, age) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var t1 = document.createTextNode(name);
    td1.appendChild(t1);

    var td2 = document.createElement('td');
    var ageInt = parseInt(age);
    if(isNaN(ageInt)) ageInt = '';
    t1 = document.createTextNode(ageInt);
    td2.appendChild(t1);

    tr.appendChild(td1);
    tr.appendChild(td2);

    var p = document.querySelector('.cli-list tbody');
    p.appendChild(tr);  
  }
  

  fs.open(dbFile, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error("Couldn't fine db file.");
        return;
      }

      throw err;
    }

    fs.createReadStream('', {encoding: 'UTF-8', fd: fd})
    .on('data', (data) => {
      var rows = data.split('\n');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i].trim();
        if(row === '') continue;

        var fields = row.split(',');
        addPerson(fields[0].trim(), fields[1]);
      }
    })
    .on('close', () => {
      // Nothing really to do.
    });
  });

  function enterRecording(e) {
    e.preventDefault();
    startScreenRecording();
  }

  function startScreenRecording() {
    const captureGui = document.querySelector('.capture-gui');
    const videoNode = captureGui.querySelector('video');
    const videoToggle = captureGui.querySelector('input[name="start_screen_record"]');
    const canvasEl = captureGui.querySelector('#canvas1');
    const imgEl = captureGui.querySelector('img.screenshot');

    function handleStream(stream) {
      videoNode.srcObject = stream;
      videoNode.onloadedmetadata = (e) => videoNode.play();
    }

    function handleError(e) {
      console.log(e);
    }

    videoNode.style.display = 'block';
    imgEl.style.display = "none";

    desktopCapturer.getSources({types: ['screen']}, (error, sources) => {
      if(error) throw error;

      for (let i = 0; i < sources.length; ++i) {
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

    function takeScreenshot(e) {
      e.preventDefault();

      videoToggle.removeEventListener('click', takeScreenshot);

      canvasEl.width = videoNode.videoWidth;
      canvasEl.height = videoNode.videoHeight;
      canvasEl.getContext('2d').drawImage(videoNode, 0, 0);

      imgEl.src = canvasEl.toDataURL('image/png');
      imgEl.style.display = "block";
      videoNode.srcObject.getVideoTracks().forEach(track => track.stop());

      videoNode.style.display = 'none';

      videoToggle.value = "Record First Screen.";
      videoToggle.addEventListener('click', enterRecording);
    }

    videoToggle.removeEventListener('click', enterRecording);
    videoToggle.value = "Take screenshot.";
    videoToggle.addEventListener('click', takeScreenshot);

  }

  document.querySelector('input[name="start_screen_record"]').addEventListener('click', enterRecording);

  document.querySelector('.newAgentForm').addEventListener('submit', (e) => {

    e.stopPropagation();
    e.preventDefault();


    var nameN = e.target.querySelector('input[id="name"]');
    var ageN = e.target.querySelector('input[id="age"]');

    addPerson(nameN.value, ageN.value);

    nameN.value = "";
    ageN.value = "";

    return false;
  });


});

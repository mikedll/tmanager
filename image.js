
function bufferToPngUrl(buffer) {

  var byteString = "";

  for(var i = 0; i < buffer.length; i++) {
    byteString += String.fromCharCode(buffer[i]);
  }

  const b64s = btoa(byteString);

  return `data:image/png;base64,${b64s}`;
}

function pngUrlToBuffer(dataURI) {
  const uriParts = dataURI.split(',');

  // convert base64/URLEncoded data component to raw binary data held in a string
  // https://stackoverflow.com/questions/19032406/convert-html5-canvas-into-file-to-be-uploaded
  var byteString;
  if (uriParts[0].indexOf('base64') >= 0)
    byteString = atob(uriParts[1]);
  else
    byteString = unescape(uriParts[1]);

  // write the bytes of the string to a typed array
  var ui8a = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ui8a[i] = byteString.charCodeAt(i);
  }
  return Buffer.from(ui8a);
}

module.exports = {
  pngUrlToBuffer: pngUrlToBuffer,
  bufferToPngUrl: bufferToPngUrl
};







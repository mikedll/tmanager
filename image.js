
function pngUrlToBuffer(dataURI) {
  const uriParts = dataURI.split(',');

  // convert base64/URLEncoded data component to raw binary data held in a string
  // https://stackoverflow.com/questions/19032406/convert-html5-canvas-into-file-to-be-uploaded
  var byteString;
  if (uriParts[0].indexOf('base64') >= 0)
    byteString = atob(uriParts[1]);
  else
    byteString = unescape(uriParts[1]);

  // separate out the mime component
  var mimeString = uriParts[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  var i8a = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    i8a[i] = byteString.charCodeAt(i);
  }
  return Buffer.from(i8a);
}

module.exports = pngUrlToBuffer;





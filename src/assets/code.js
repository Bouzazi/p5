function getSnap() {
  canvas = document.getElementsByTagName("canvas")[1].getContext("2d");
  canvas.drawImage(
    document.getElementsByTagName("canvas")[0].getContext("2d").canvas,
    0,
    0
  );
}

function downloadImage(filename = "untitled.jpeg") {
  data = document
    .getElementsByTagName("canvas")[0]
    .getContext("2d")
    .canvas.toDataURL("image/jpeg", 1.0);
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

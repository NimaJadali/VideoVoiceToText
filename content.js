chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "clicked_browser_action") { 
      console.log("yeet");
      var video = null;
      var canvas = null;
      var ctx = null;
      createVid();
      createCanvas();
      startSnapshotting();
      sendResponse({farewell: "goodbye"});
    }
  }
);

function createVid() {
  video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('width', '320');
  video.setAttribute('height', '240');
  video.style.position = 'fixed';
  video.style.top = 0;
  video.style.right = 0;
  document.body.appendChild(video);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, handleVideo, videoError);
  }

  function handleVideo(stream) {
    video.srcObject = stream;
    video.play();
  }

  function videoError(e) {
    alert("Error w/ webcam video.");
    console.log(e);
  }
}

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', '300');
  canvas.setAttribute('height', '240');
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  document.body.appendChild(canvas);
}

function startSnapshotting() {
  ctx = canvas.getContext('2d');
  var timer = setInterval(sendSnapshot, 20);
}

function sendSnapshot() {
  ctx.drawImage(video, 0, 0, 300, 240);
  var data = canvas.toDataURL('image/png');
  chrome.extension.sendMessage({
      type: "snapshot",
      payload: data
  });
}
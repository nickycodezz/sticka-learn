const startBtn = document.getElementById("startBtn");
const exitBtn = document.getElementById("exitBtn");

// Go to the camera page
startBtn.onclick = () => {
  window.location.href = "camera.html";
};

// Try to close tab; if not possible, blank it
exitBtn.onclick = () => {
  window.close();
  setTimeout(() => {
    window.location.href = "about:blank";
  }, 200);
};
import { saveSticker, loadStickers, clearStickers } from "./storage.js";

// connect to HTML elements
const video = document.getElementById("cam");
const canvas = document.getElementById("photo");
const ctx = canvas.getContext("2d");

async function startCam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied or not available.");
    console.error(err);
  }
}

// Take photo → draw into canvas
document.getElementById("snap").onclick = () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
};

// Save current canvas as sticker
document.getElementById("save").onclick = () => {
  const name = prompt("Name your sticker:", "My Sticker") || "My Sticker";
  const dataURL = canvas.toDataURL("image/png"); // transparent-friendly
  saveSticker(name, dataURL);
  renderGallery(); // refresh list
};

// Show gallery
document.getElementById("show").onclick = () => renderGallery();

// Clear gallery
document.getElementById("clear").onclick = () => {
  if (confirm("Delete all saved stickers?")) {
    clearStickers();
    renderGallery();
  }
};

// Render thumbnails
function renderGallery() {
  const container = document.getElementById("gallery");
  container.innerHTML = "";
  const items = loadStickers();
  items.forEach(s => {
    const card = document.createElement("div");
    card.style.cssText = "display:flex;flex-direction:column;align-items:center;";
    const img = document.createElement("img");
    img.src = s.img;
    img.width = 120;
    img.height = 90;
    img.style.cssText = "object-fit:contain;border:2px solid #444;border-radius:8px;background:#222;";
    const cap = document.createElement("div");
    cap.textContent = s.name;
    cap.style.cssText = "font-size:.85rem;color:#bbb;margin-top:4px;";
    card.appendChild(img);
    card.appendChild(cap);
    container.appendChild(card);
  });
}

startCam();

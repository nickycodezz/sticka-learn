// app/src/main.js
import { saveSticker, loadStickers, deleteSticker } from "./storage.js";
import { getImaginationPrompt } from "./ai.js"; // NEW

const video = document.getElementById("cam");
const canvas = document.getElementById("photo");
const ctx = canvas.getContext("2d");

const btnSnap = document.getElementById("snap");
const btnSave = document.getElementById("save");
const btnRetake = document.getElementById("retake");
const galleryEl = document.getElementById("gallery");

// NEW: prompt UI elements
const promptEl = document.getElementById("promptText");
const btnAnother = document.getElementById("anotherPrompt");

async function startCam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied or not available.");
    console.error(err);
  }
}

function showLive() {
  video.classList.remove("hidden");
  canvas.classList.add("hidden");
  btnSnap.classList.remove("hidden");
  btnSave.classList.add("hidden");
  btnRetake.classList.add("hidden");
}

function showPreview() {
  video.classList.add("hidden");
  canvas.classList.remove("hidden");
  btnSnap.classList.add("hidden");
  btnSave.classList.remove("hidden");
  btnRetake.classList.remove("hidden");
}

function getStandardizedDataURL() {
  const TW = 480, TH = 360;
  const off = document.createElement("canvas");
  off.width = TW;
  off.height = TH;
  const octx = off.getContext("2d");
  octx.drawImage(canvas, 0, 0, TW, TH);
  return off.toDataURL("image/png");
}

btnSnap.onclick = () => {
  canvas.width = video.videoWidth || 960;
  canvas.height = video.videoHeight || 720;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  showPreview();
};

btnSave.onclick = () => {
  const name = prompt("Name your inspiration:", "My Wonder") || "My Wonder";
  const dataURL = getStandardizedDataURL();
  saveSticker(name, dataURL);
  renderGallery();
  showLive();
};

btnRetake.onclick = () => showLive();

function renderGallery() {
  const items = loadStickers();
  galleryEl.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.style.color = "#6b7280";
    empty.textContent = "No inspo yet. Take and save a photo.";
    galleryEl.appendChild(empty);
    return;
  }

  items.sort((a, b) => b.id - a.id).forEach((s) => {
    const card = document.createElement("div");
    card.className = "card";

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "✖";
    del.onclick = () => {
      deleteSticker(s.id);
      renderGallery();
    };

    const img = document.createElement("img");
    img.className = "thumb";
    img.src = s.img;
    img.alt = s.name;

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = s.name;

    card.appendChild(del);
    card.appendChild(img);
    card.appendChild(title);
    galleryEl.appendChild(card);
  });
}

// === NEW: Prompt handling ===
async function setPromptFromAI() {
  try {
    promptEl.textContent = "Loading an idea…";
    const p = await getImaginationPrompt();
    promptEl.textContent = p;
  } catch (e) {
    promptEl.textContent = "I wonder… can you find something interesting?";
  }
}

// “Another Idea” button
if (btnAnother) {
  btnAnother.onclick = async () => {
    btnAnother.disabled = true;
    btnAnother.textContent = "Thinking…";
    await setPromptFromAI();
    btnAnother.disabled = false;
    btnAnother.textContent = "Another Idea";
  };
}

// Init
startCam();
showLive();
renderGallery();
setPromptFromAI(); // NEW: load a prompt as soon as camera page opens


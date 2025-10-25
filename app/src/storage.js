const KEY = "stickers_v1";

export function saveSticker(name, dataURL) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  list.push({ id: Date.now(), name, img: dataURL, ts: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadStickers() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function clearStickers() {
  localStorage.removeItem(KEY);
}

const KEY = "stickers_v1";

export function saveSticker(name, dataURL) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  const item = { id: Date.now(), name, img: dataURL, ts: new Date().toISOString() };
  list.push(item);
  localStorage.setItem(KEY, JSON.stringify(list));
  return item;
}

export function loadStickers() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function deleteSticker(id) {
  const next = loadStickers().filter(s => s.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearStickers() {
  localStorage.removeItem(KEY);
}

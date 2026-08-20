import init, { patch, version, mapping_counts, data_version } from "./pkg/wa_patcher.js";

const drop = document.getElementById("drop");
const fileInput = document.getElementById("file-input");
const pickBtn = document.getElementById("pick-btn");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const stats = document.getElementById("stats");
const downloadBtn = document.getElementById("download-btn");
const fileMeta = document.getElementById("file-meta");
const errorBox = document.getElementById("error");
const errorText = document.getElementById("error-text");
const versionLine = document.getElementById("version-line");
const counts = document.getElementById("counts");

let lastBlob = null;
let lastName = null;

async function start() {
  try {
    await init();
    versionLine.textContent = `Patcher v${version()} · game data ${data_version()}`;
    const c = mapping_counts();
    counts.textContent =
      `Mappings: spell=${c.spell} item=${c.item} zone=${c.zone} encounter=${c.encounter}`;
  } catch (err) {
    showError(new Error("Failed to load WASM: " + (err.message || err)));
  }
}

function showError(err) {
  errorBox.hidden = false;
  errorText.textContent = err.stack || String(err);
  status.hidden = true;
  result.hidden = true;
}

function showStatus(text, showProgress = false) {
  status.hidden = false;
  statusText.textContent = text;
  progress.hidden = !showProgress;
  if (showProgress) progress.value = 0;
  errorBox.hidden = true;
  result.hidden = true;
}

function clearStatus() {
  status.hidden = true;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / 1024 / 1024).toFixed(2)} MiB`;
}

async function handleFile(file) {
  lastBlob = null;
  lastName = null;
  downloadBtn.disabled = true;

  if (!file.name.toLowerCase().endsWith(".lua")) {
    showError(new Error("Only .lua files are accepted."));
    return;
  }

  showStatus(`Reading ${file.name}… (${formatBytes(file.size)})`);

  // Read on the next tick so the status actually paints.
  await new Promise((r) => setTimeout(r, 30));

  let bytes;
  try {
    const buf = await file.arrayBuffer();
    bytes = new Uint8Array(buf);
  } catch (err) {
    showError(new Error("Could not read file: " + (err.message || err)));
    return;
  }

  showStatus("Patching…");

  await new Promise((r) => setTimeout(r, 30));

  let res;
  try {
    res = patch(bytes);
  } catch (err) {
    showError(new Error("Patching failed: " + (err.message || err)));
    return;
  }

  // `res` is a JS object: { output: number[], stats: {…} }.
  // Wrap the byte array in Uint8Array for Blob consumption.
  const outBytes = new Uint8Array(res.output);
  const statObj = res.stats;

  const base = file.name.replace(/\.lua$/i, "");
  const filename = `${base}.patched.lua`;
  lastBlob = new Blob([outBytes], { type: "application/octet-stream" });
  lastName = filename;

  stats.textContent = JSON.stringify(statObj, null, 2);
  fileMeta.textContent =
    `${file.name} (${formatBytes(file.size)}) → ${filename} (${formatBytes(outBytes.length)})`;
  downloadBtn.disabled = false;
  result.hidden = false;
  clearStatus();
}
downloadBtn.addEventListener("click", () => {
  if (!lastBlob) return;
  const url = URL.createObjectURL(lastBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = lastName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

drop.addEventListener("click", (e) => {
  if (e.target === pickBtn) return; // button handles its own click
  fileInput.click();
});

pickBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const f = fileInput.files && fileInput.files[0];
  if (f) handleFile(f);
});

["dragenter", "dragover"].forEach((evt) =>
  drop.addEventListener(evt, (e) => {
    e.preventDefault();
    drop.classList.add("dragover");
  })
);

["dragleave", "drop"].forEach((evt) =>
  drop.addEventListener(evt, (e) => {
    e.preventDefault();
    if (evt === "dragleave" && e.target !== drop) return;
    drop.classList.remove("dragover");
  })
);

drop.addEventListener("drop", (e) => {
  e.preventDefault();
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) handleFile(f);
});

start();

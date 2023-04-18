const DEFAULT_SIZE = 16;
const DEFAULT_GRID_COLOR = "lightseagreen";
const DEFAULT_PICK_COLOR = "#ff99cc";
const DEFAULT_MODE = "color";

let currentColor = DEFAULT_PICK_COLOR;
let currentSize;
let currentMode = DEFAULT_MODE;
let mousedown = false;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const sizeValue = document.getElementById("size");
const slider = document.getElementById("slider");
const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode(DEFAULT_MODE);
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => reloadGrid();
slider.oninput = (e) => changeSize(e.target.value);

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
  activateBtn();
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function reloadGrid() {
  clearGrid();
  setUpGrid();
}

function changeSize(size) {
  setCurrentSize(size);
  updateSizeValue();
  reloadGrid();
}

function clearGrid() {
  grid.innerHTML = "";
}

function setUpGrid() {
  grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  grid.style.backgroundColor = DEFAULT_GRID_COLOR;

  for (let i = 0; i < currentSize * currentSize; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.borderColor = "grey";
    cell.style.borderStyle = "solid";
    cell.addEventListener("mousedown", changeColor);
    cell.addEventListener("mouseover", changeColor);
    grid.appendChild(cell);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mousedown) return;
  if (currentMode === DEFAULT_MODE)
    e.target.style.backgroundColor = currentColor;
  else if (currentMode === "rainbow")
    e.target.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
  else if (currentMode === "eraser")
    e.target.style.backgroundColor = DEFAULT_GRID_COLOR;
}

function getRandomColor() {
  return Math.floor(Math.random() * 256);
}

function updateSizeValue() {
  sizeValue.innerHTML = `${currentSize} x ${currentSize}`;
}

function activateBtn() {
  if (currentMode === "color") {
    colorBtn.classList.add("active");
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.remove("active");
  } else if (currentMode === "rainbow") {
    colorBtn.classList.remove("active");
    rainbowBtn.classList.add("active");
    eraserBtn.classList.remove("active");
  } else {
    colorBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  setCurrentSize(DEFAULT_SIZE);
  setUpGrid();
  setCurrentMode(DEFAULT_MODE);
};

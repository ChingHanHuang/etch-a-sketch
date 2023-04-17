const DEFAULT_SIZE = 10;
const DEFAULT_GRID_COLOR = "lightseagreen";
const DEFAULT_PICK_COLOR = "#ff99cc";

let currentColor = DEFAULT_PICK_COLOR;
let currentSize;
let mousedown = false;
document.body.onmousedown = () => mousedown = true;
document.body.onmouseup = () => mousedown = false;

const colorPicker = document.getElementById("colorPicker");
const sizeValue = document.getElementById("size");
const slider = document.getElementById("slider");
const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
clearBtn.onclick = () => reloadGrid();
slider.oninput = (e) => changeSize(e.target.value);


function setCurrentColor(newColor) {
    currentColor = newColor;
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
    reloadGrid()
}

function clearGrid() {
    grid.innerHTML = "";
}

function setUpGrid() {
    grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
    grid.style.backgroundColor = DEFAULT_GRID_COLOR;

    for(let i = 0; i < currentSize * currentSize; i++) {
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
    e.target.style.backgroundColor = currentColor;
}

function updateSizeValue() {
    sizeValue.innerHTML = `${currentSize} x ${currentSize}`;
}

window.onload = () => {
    setCurrentSize(DEFAULT_SIZE);
    setUpGrid();
}

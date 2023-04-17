const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "";

let currentColor = DEFAULT_COLOR;
let mousedown = false;
document.body.onmousedown = () => mousedown = true;
document.body.onmouseup = () => mousedown = false;

const colorPicker = document.getElementById("colorPicker");
const clearBtn = document.getElementById("clearBtn");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
clearBtn.onclick = () => clearGridColor();


function setCurrentColor(newColor) {
    currentColor = newColor;
}

let slider = document.getElementById("myRange");
slider.oninput = function() {
    document.querySelectorAll(".cell").forEach(el => el.remove());
    setUpGrid(this.value);
    updateSizeValue(this.value);
}

function setUpGrid(size) {
    let grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.borderColor = "blue";
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

function updateSizeValue(size) {
    document.getElementById("size").innerHTML = `${size} x ${size}`;

}

function clearGridColor() {

}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}

const DEFAULT_SIZE = 10;

let mousedown = false;
document.body.onmousedown = () => mousedown = true;
document.body.onmouseup = () => mousedown = false;


const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener('click', clearPaint);


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
    e.target.style.backgroundColor = "red";
}

function updateSizeValue(size) {
    document.getElementById("size").innerHTML = `${size} x ${size}`;

}

function clearPaint() {

}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}

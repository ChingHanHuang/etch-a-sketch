


let slider = document.getElementById("myRange");
let gridSize = document.getElementById("size");
slider.oninput = function() {
    document.querySelectorAll(".column").forEach(el => el.remove());
    createGrid(this.value);
}

function createGrid(size) {
    gridSize.innerHTML = `${size} x ${size}`;
    let grid = document.getElementById("grid");
    for(let i = 0; i < size; i++) {
        let column = document.createElement("div");
        column.className = "column";
        for(let j = 0; j < size; j++) {
            let row = document.createElement("div");
            row.className = "row";
            row.style.width = "50px";
            row.style.height = "50px";
            row.style.background = "pink";

            column.appendChild(row);
        }
        grid.appendChild(column);
    }
}

createGrid(slider.value);

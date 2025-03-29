/**
 * @param {number} rows
 * @param {number} cols
 */

const controls = {
	clear: document.querySelector("#clear"),
	create: document.querySelector("#create"),
};

function createGrid(rows = 16, cols = 16) {
	if (rows > 100 || cols > 100) return;
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";
	const pixDimension = grid.clientWidth / rows;
	console.log(pixDimension);

	for (let i = 0; i < rows * cols; i++) {
		const pix = document.createElement("div");
		pix.classList.add("pix");
		pix.style.flexBasis = pixDimension + "px";
		pix.style.height = pixDimension + "px";
		grid.appendChild(pix);
	}
}

function fillPix(e) {
	const pix = e.target;
	pix.style["background-color"] = "#000";
}

function unfillPix() {
	const pixes = document.querySelectorAll(".pix");
	pixes.forEach((pix) => (pix.style["background-color"] = "#fff"));
}

/**
 * @return {number[]}
 */
function getDimensions() {
	const rows = document.querySelector("#rows").value;
	const cols = document.querySelector("#cols").value;

	return [rows, cols];
}

window.addEventListener("mousedown", () => {
	const grid = document.querySelector(".grid");
	grid.addEventListener("mouseover", fillPix);
});

window.addEventListener("mouseup", () => {
	const grid = document.querySelector(".grid");
	grid.removeEventListener("mouseover", fillPix);
});

controls.clear.addEventListener("click", unfillPix);
controls.create.addEventListener("click", () => createGrid(...getDimensions()));

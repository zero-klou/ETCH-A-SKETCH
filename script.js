/**
 * @param {number} rows
 * @param {number} cols
 */

const controls = {
	clear: document.querySelector("#clear"),
	create: document.querySelector("#create"),
	mode: {
		black: document.querySelector("#black-mode"),
		rgb: document.querySelector("#rgb-mode"),
	},
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

function getRandomRGB() {
	let randomValue = Math.floor(Math.random() * 10); // random value 0 to 9

	switch (randomValue) {
		case 1:
		case 2:
		case 3:
			return "red";

		case 4:
		case 5:
		case 6:
			return "green";

		case 7:
		case 8:
		case 9:
			return "blue";

		case 0:
			return getRandomRGB();
	}
}

function fillPix(e) {
	const pix = e.target;

	if (controls.mode.black.checked) {
		pix.style["opacity"] = `${0.1 + +window.getComputedStyle(pix).opacity}`;
		pix.style["background-color"] = "#000";
	} else if (controls.mode.rgb.checked) {
		pix.style["opacity"] = "1";
		pix.style["background-color"] = getRandomRGB();
	}
}

function unfillPix() {
	const pixes = document.querySelectorAll(".pix");
	pixes.forEach((pix) => {
		pix.style["background-color"] = "#fff";
		pix.style["opacity"] = "0";
	});
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

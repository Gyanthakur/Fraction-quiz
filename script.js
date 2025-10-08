// Helper functions
function getGCD(a, b) {
	while (b) [a, b] = [b, a % b];
	return a;
}

function simplifyFraction(num, den) {
	const gcd = getGCD(Math.abs(num), Math.abs(den));
	return [num / gcd, den / gcd];
}

// Global variables
let score = 0;
let currentQuestion = 1;
let questions = [];
let currentProblem = null;
let slicesA = [];
let slicesB = [];
let resultSlices = [];
let answered = false;

// Generate 5 questions (mix of addition and subtraction)
function generateQuestions() {
	questions = [];
	const operations = ["+", "+", "+", "-", "-"]; // 3 addition, 2 subtraction

	for (let i = 0; i < 5; i++) {
		const den = Math.floor(Math.random() * 5) + 3; // denominator 3-7
		let numA, numB;
		const operation = operations[i];

		if (operation === "+") {
			// For addition, ensure numA + numB < denominator
			numA = Math.floor(Math.random() * (den - 2)) + 1;
			const maxNumB = den - numA - 1;
			numB = Math.floor(Math.random() * maxNumB) + 1;
		} else {
			// For subtraction, ensure A >= B
			numA = Math.floor(Math.random() * (den - 1)) + 1;
			numB = Math.floor(Math.random() * numA) + 1;
			if (numB >= numA) numB = Math.floor(numA / 2) || 1;
		}

		questions.push({
			numA,
			denA: den,
			numB,
			denB: den,
			operation,
		});
	}
}

// Draw on canvas
function drawPizza(canvasId, denominator, sliceArr) {
	const canvas = document.getElementById(canvasId);
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const r = canvas.width / 2 - 10;

	for (let i = 0; i < denominator; i++) {
		const angle1 = ((2 * Math.PI) / denominator) * i - Math.PI / 2;
		const angle2 = angle1 + (2 * Math.PI) / denominator;

		ctx.beginPath();
		ctx.moveTo(cx, cy);
		ctx.arc(cx, cy, r, angle1, angle2, false);
		ctx.closePath();

		// Color based on slice type
		if (sliceArr[i] === 1) {
			ctx.fillStyle = "#667eea"; // Blue for A
		} else if (sliceArr[i] === 2) {
			ctx.fillStyle = "#e94e3d"; // Red for B
		} else if (sliceArr[i] === 3) {
			ctx.fillStyle = "#34a853"; // Green for result (combined)
		} else {
			ctx.fillStyle = "#fff"; // White for empty
		}

		ctx.fill();
		ctx.strokeStyle = "#333";
		ctx.lineWidth = 2;
		ctx.stroke();
	}

	// Draw center label
	const filledCount = sliceArr.filter((x) => x).length;
	ctx.fillStyle = "#222";
	ctx.font = "bold 18px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(filledCount + "/" + denominator, cx, cy);

	// Update result label
	if (canvasId === "pizzaResult") {
		document.getElementById("labelResult").textContent =
			filledCount + "/" + denominator;
	}
}

// Setup a new problem
function setupProblem() {
	if (currentQuestion > 5) {
		showFinalScore();
		return;
	}

	currentProblem = questions[currentQuestion - 1];
	answered = false;

	const { numA, denA, numB, denB, operation } = currentProblem;

	// Update UI
	document.getElementById("currentQ").textContent = currentQuestion;
	document.getElementById("labelA").textContent = `${numA}/${denA}`;
	document.getElementById("labelB").textContent = `${numB}/${denB}`;
	document.getElementById("operator").textContent = operation;
	document.getElementById("ansNum").value = "";
	document.getElementById("ansDen").value = "";
	document.getElementById("feedback").textContent = "";
	document.getElementById("feedback").className = "feedback";
	document.getElementById("nextBtn").style.display = "none";
	document.getElementById("checkBtn").disabled = false;

	// Set operation badge
	const badge = document.getElementById("operationType");
	if (operation === "+") {
		badge.textContent = "➕ Addition";
		badge.style.background = "#e6f4ea";
		badge.style.color = "#34a853";
	} else {
		badge.textContent = "➖ Subtraction";
		badge.style.background = "#fce8e6";
		badge.style.color = "#ea4335";
	}

	// Initialize slices
	slicesA = Array(denA).fill(0);
	for (let i = 0; i < numA; i++) slicesA[i] = 1;

	slicesB = Array(denB).fill(0);
	for (let i = 0; i < numB; i++) slicesB[i] = 2;

	// Set instructions and result size
	if (operation === "+") {
		document.getElementById("instruction").textContent =
			"👆 Drag slices from both pizzas to the result pizza!";

		// Result always has same denominator
		resultSlices = Array(denA).fill(0);
	} else {
		document.getElementById("instruction").textContent =
			"👆 Drag slices from the RED to the BLUE to subtract!";
		resultSlices = Array(denA).fill(0);
	}

	drawPizza("pizzaA", denA, slicesA);
	drawPizza("pizzaB", denB, slicesB);
	drawPizza("pizzaResult", denA, resultSlices);

	enableDragging();
}

// Enable drag and drop functionality
function enableDragging() {
	let dragging = null;
	let dragSrc = null;

	const operation = currentProblem.operation;

	// For addition: drag from A and B to Result
	if (operation === "+") {
		["pizzaA", "pizzaB"].forEach((canvasId) => {
			const canvas = document.getElementById(canvasId);

			canvas.onmousedown = function (e) {
				const slices = canvasId === "pizzaA" ? slicesA : slicesB;
				const idx = getSliceIndex(canvas, e);
				if (slices[idx]) {
					dragging = idx;
					dragSrc = canvasId;
				}
			};
		});

		const resultCanvas = document.getElementById("pizzaResult");
		resultCanvas.onmouseup = function (e) {
			if (dragging !== null && dragSrc) {
				const srcSlices = dragSrc === "pizzaA" ? slicesA : slicesB;
				const idx = getSliceIndex(resultCanvas, e);

				if (!resultSlices[idx]) {
					resultSlices[idx] = 3; // Green color for combined result
					srcSlices[dragging] = 0;
					drawPizza(dragSrc, currentProblem.denA, srcSlices);
					drawPizza("pizzaResult", currentProblem.denA, resultSlices);
				}
			}
			dragging = null;
			dragSrc = null;
		};
	}
	// For subtraction: drag from B to A
	else {
		const canvasB = document.getElementById("pizzaB");
		canvasB.onmousedown = function (e) {
			const idx = getSliceIndex(canvasB, e);
			if (slicesB[idx] === 2) {
				// Only drag red slices
				dragging = idx;
				dragSrc = "pizzaB";
			}
		};

		const canvasA = document.getElementById("pizzaA");
		canvasA.onmouseup = function (e) {
			if (dragging !== null && dragSrc === "pizzaB") {
				const idx = getSliceIndex(canvasA, e);

				if (slicesA[idx] === 1) {
					// Only if there's a blue slice
					slicesA[idx] = 0; // Remove blue slice
					slicesB[dragging] = 0; // Remove red slice
					drawPizza("pizzaA", currentProblem.denA, slicesA);
					drawPizza("pizzaB", currentProblem.denB, slicesB);
				}
			}
			dragging = null;
			dragSrc = null;
		};
	}
}

// Get slice index from mouse position
function getSliceIndex(canvas, e) {
	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	let theta = Math.atan2(y - cy, x - cx) + Math.PI / 2;
	if (theta < 0) theta += 2 * Math.PI;

	// All pizzas use the same denominator
	const denominator = currentProblem.denA;

	return Math.floor(theta / ((2 * Math.PI) / denominator));
}

// Check answer
document.getElementById("checkBtn").onclick = function () {
	if (answered) return;

	const userNum = parseInt(document.getElementById("ansNum").value);
	const userDen = parseInt(document.getElementById("ansDen").value);

	if (isNaN(userNum) || isNaN(userDen) || userDen === 0) {
		alert("Please enter valid numbers!");
		return;
	}

	const { numA, denA, numB, operation } = currentProblem;
	let correctNum, correctDen;

	if (operation === "+") {
		correctNum = numA + numB;
		correctDen = denA;
	} else {
		correctNum = numA - numB;
		correctDen = denA;
	}

	const [simpleNum, simpleDen] = simplifyFraction(correctNum, correctDen);
	const [userSimpleNum, userSimpleDen] = simplifyFraction(userNum, userDen);

	const feedback = document.getElementById("feedback");

	if (userSimpleNum === simpleNum && userSimpleDen === simpleDen) {
		score++;
		document.getElementById("score").textContent = score;
		feedback.textContent = "🎉 Correct! Great job!";
		feedback.className = "feedback correct";
	} else {
		feedback.textContent = `❌ Incorrect. The answer is ${simpleNum}/${simpleDen}`;
		feedback.className = "feedback incorrect";
	}

	answered = true;
	document.getElementById("checkBtn").disabled = true;
	document.getElementById("nextBtn").style.display = "inline-block";
};

// Show hint
document.getElementById("hintBtn").onclick = function () {
	const { numA, denA, numB, operation } = currentProblem;
	let hint;

	if (operation === "+") {
		hint = `Since both fractions have the same denominator (${denA}), just add the numerators: ${numA} + ${numB} = ${
			numA + numB
		}. So the answer is ${numA + numB}/${denA}. Simplify if needed!`;
	} else {
		hint = `Since both fractions have the same denominator (${denA}), just subtract the numerators: ${numA} - ${numB} = ${
			numA - numB
		}. So the answer is ${numA - numB}/${denA}. Simplify if needed!`;
	}

	alert(hint);
};

// Next question
document.getElementById("nextBtn").onclick = function () {
	currentQuestion++;
	setupProblem();
};

// Show final score
function showFinalScore() {
	document.getElementById("quizScreen").style.display = "none";
	document.getElementById("finalScoreValue").textContent = score;
	document.getElementById("finalScore").style.display = "block";
}

// Start quiz button
document.getElementById("startBtn").onclick = function () {
	document.getElementById("startScreen").style.display = "none";
	document.getElementById("quizScreen").style.display = "block";
	generateQuestions();
	setupProblem();
};

// Restart quiz
document.getElementById("restartBtn").onclick = function () {
	score = 0;
	currentQuestion = 1;
	document.getElementById("score").textContent = score;

	document.getElementById("finalScore").style.display = "none";
	document.getElementById("startScreen").style.display = "block";
};

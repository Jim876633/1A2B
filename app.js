const numbers = document.querySelectorAll(".number");
const allTableRow = document.querySelectorAll("tr");
const endGame = document.querySelector(".endGame");
const endGameText = document.querySelector(".text");
const againButton = document.querySelector(".againButton");
const inputNumbers = [];

let answer = randomAnswer();
let matchNumber = 0;
let includeNumber = 0;

function randomAnswer() {
    const numberArray = [];
    function randomNumber() {
        const number = Math.floor(Math.random() * 10);
        if (numberArray.includes(number)) {
            randomNumber();
        } else {
            numberArray.push(number);
        }
    }
    for (let i = 0; i < 4; i++) {
        randomNumber();
    }
    return numberArray;
}

function pushNumber(e) {
    e.preventDefault(); //prevent enter key to action click event
    if (
        (+e.key || e.key == 0) &&
        inputNumbers.length < 4 &&
        !inputNumbers.includes(+e.key)
    ) {
        inputNumbers.push(+e.key);
        displayNumber();
    }
    if (e.key === "Backspace") {
        inputNumbers.pop();
        displayNumber();
    }
    if (e.key === "Enter") {
        if (inputNumbers.length === 4) {
            matchAnswer(inputNumbers);
        }
    }
}

function matchAnswer(input) {
    input.map((number, index) => {
        if (number === answer[index]) {
            matchNumber++;
        } else if (answer.includes(number)) {
            includeNumber++;
        }
    });
    displayResult();

    if (matchNumber === 4) {
        document.removeEventListener("keydown", pushNumber);
        displayEndGame("You win");
    } else if (
        allTableRow[allTableRow.length - 1].lastElementChild.innerHTML !== ""
    ) {
        document.removeEventListener("keydown", pushNumber);
        displayEndGame("You lose");
    } else {
        resetAll();
        displayNumber();
    }
}

function againGame() {
    endGame.classList.remove("show");
    allTableRow.forEach((row) => {
        row.innerHTML = `<td></td><td></td>`;
    });
    answer = randomAnswer();
    document.addEventListener("keydown", pushNumber);
    resetAll();
    displayNumber();
}

/*-------------------------------render------------------------------------*/

function displayNumber() {
    numbers.forEach((number, index) => {
        if (inputNumbers[index] || inputNumbers[index] === 0) {
            number.innerText = inputNumbers[index];
        } else {
            number.innerText = "";
        }
    });
}
function displayResult() {
    const result = `<span>${inputNumbers.join(
        ""
    )}</span> <span>${matchNumber}A${includeNumber}B</span> `;
    let isDisplay = true;
    allTableRow.forEach((tr, _, arg) => {
        if (isDisplay) {
            if (tr.firstElementChild.innerHTML === "") {
                tr.firstElementChild.innerHTML = result;
                isDisplay = false;
            }
        }
        if (isDisplay) {
            if (
                arg[arg.length - 1].firstElementChild.textContent !== "" &&
                tr.lastElementChild.innerHTML === ""
            ) {
                tr.lastElementChild.innerHTML = result;
                isDisplay = false;
            }
        }
    });
}

function displayEndGame(message) {
    endGameText.textContent = message;
    endGame.classList.add("show");
}

function resetAll() {
    inputNumbers.length = 0;
    matchNumber = 0;
    includeNumber = 0;
}

console.log(answer);
document.addEventListener("keydown", pushNumber);
againButton.addEventListener("click", againGame);

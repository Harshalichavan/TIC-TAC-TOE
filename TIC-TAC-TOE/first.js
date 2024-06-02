let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn"); // Corrected ID to "new-btn"
let msgContain = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // Variable to track turns
const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

let resetGame = () => {
    turno = true;
    enableBoxes();
    msgContain.classList.add("hide");
    msg.innerText = "";
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false; // Reset disabled state
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno && box.innerText === "") {
            box.innerText = "O";
            turno = false;
        } else if (box.innerText === "") {
            box.innerText = "X";
            turno = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContain.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

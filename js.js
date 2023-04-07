const saveInput = (() => {
    let _p1name = "Player 1";
    let _p2name = "Player 2";
    const submitValue = () => {
        event.preventDefault();
        const player1 = document.querySelector("#player1");
        const player2 = document.querySelector("#player2");
        if (player1.value) {
            _p1name = player1.value;
        }
        if (player2.value) {
            _p2name = player2.value;
        }
    }
    document.querySelector(".savebutton").addEventListener("click", () => {
        submitValue();
        scoreBoard.setNames();
        scoreBoard.setScores();
    })
    return {
        submitValue,
        get p1name() {
            return _p1name;
        },
        get p2name() {
            return _p2name;
        }
    }
})()

const scoreBoard = (() => {
    const setNames = () => {
        document.querySelector(".p1-name").innerHTML = saveInput.p1name;
        document.querySelector(".p2-name").innerHTML = saveInput.p2name;
        playerOne.name = saveInput.p1name;
        playerTwo.name = saveInput.p2name;
    }
    const setScores = () => {
        document.querySelector(".p1-score").innerHTML = playerOne.printScore();
        document.querySelector(".p2-score").innerHTML = playerTwo.printScore();
    }

    return {
        setNames,
        setScores
    }
})()

// Make gameboard object
// And make gameboard array inside of object
// Flow game time object

const body = document.querySelector(".body");
const gameBoard = (() => {
    // IIFE
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => {
        return board;
    }
    let flow = 0;
    const resetFlow = () => {
        flow = 9;
    }
    const checkBoard = (count) => {
        const checkAlready = () => {
            if (board[count] !== "") {
                alert("Already exists");
                return false;
            } else {
                return true;
            }
        }
        return checkAlready(count);
    };
    const fill = (count = 0) => {
        if (flow > 8) {
            alert("Flow Ended!");
            return false;
        } else {
            if (checkBoard(count)) {
                if (flow % 2 === 0) {
                    board[count] = "X";
                    flow++;
                } else {
                    board[count] = "O";
                    flow++;
                }
            }
        }
        Logic();
        printBoard();
    }
    const printBoard = () => {
        body.innerHTML = "";
        let count = 0;
        let store = [];
        let idCount = 0;
        for (let i = 0; i < board.length; i = i + 3) {
             store.push(
                `
                    <div class="flex flex-row">
                        <div class="m-0.5 w-24 h-12 border-solid border-2 border-black text-4xl rounded-lg text-center"
                             id="${"board-" + (idCount)}" onClick="gameBoard.fill(${count});">${board[i]}</div>
                        <div class="m-0.5 w-24 h-12 border-solid border-2 border-black text-4xl rounded-lg text-center"
                             id="${"board-" + (idCount+1)}" onClick="gameBoard.fill(${count + 1});">${board[i + 1]}</div>
                        <div class="m-0.5 w-24 h-12 border-solid border-2 border-black text-4xl rounded-lg text-center"
                             id="${"board-" + (idCount+2)}" onClick="gameBoard.fill(${count + 2});">${board[i + 2]}</div>
                    </div>
                `);
            count += 3;
             idCount += 3;
        }
        let a;
        a = store.join(" ");
        body.innerHTML = a;
    }
    const resetBoard = () => {
        flow = 0;
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        printBoard()
    }
    printBoard();
    return {fill, printBoard, getBoard, resetFlow, resetBoard}
})();

// Object for players
const createPlayer = (name) => {
    let _name = name;
    let score = 0;
    const addScore = () => {
        score += 1;
    }
    const printScore = () => {
        return score;
    }
    const resetScore = () => {
        score = 0;
    }
    return {
        get name() {
            return _name;
        },
        set name(names) {
            _name = names;
        },
        addScore,
        printScore,
        resetScore
    }
};

const playerOne = createPlayer("Player 1");
const playerTwo = createPlayer("Player 2");

const Logic = () => {
    // 1 3 4
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
        // Check "X" "X" "X"
        //       "." "." "."
        //       "." "." "."
        if (board[i] !==  "" && board[i] === board[i+1] && board[i+1] === board[i+2]) {
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
            }
        } else if (board[i] !==  "" && board[i] === board[i+3] && board[i+3] === board[i+6]) {
            // "X" "." "."
            // "X" "." "."
            // "X" "." "."
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
            }
        } else if (board[i] !==  "" && board[i] === board[i+4] && board[i+4] === board[i+8]) {
            // "X" "." "."
            // "." "X" "."
            // "." "." "X"
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
            }
        } else if (board[i] !==  "" && board[i] === board[i+2] && board[i+2] === board[i+4]) {
                   } else if (board[i] !==  "" && board[i] === board[i+4] && board[i+4] === board[i+8]) {
            // "." "." "X"
            // "." "X" "."
            // "X" "." "."
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
            }
        }
    }
    return {};
}

(() => {
    document.querySelector(".reset-score").addEventListener("click", () => {
        playerOne.resetScore();
        playerTwo.resetScore();
        scoreBoard.setScores();
    })
    document.querySelector(".reset-board").addEventListener("click", () => {
        gameBoard.resetBoard();
    })
})();
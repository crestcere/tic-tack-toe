// Score
//
// window.onbeforeunload = function () {return false;} // Disable auto refresh

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
                console.log("Already exists");
                // TODO Add pop-up
                return false;
            } else {
                return true;
            }
        }
        return checkAlready(count);
    };
    const fill = (count = 0) => {
        if (flow > 8) {
            console.log("Flow Ended!");
            // TODO Add pop-up
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
        for (let i = 0; i < board.length; i = i + 3) {
             store.push(
                `
                    <div style="display: flex; flex-direction: row">
                        <div class="${count}" onclick="gameBoard.fill(${count});" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i]}</div>
                        <div class="${count+1}" onclick="gameBoard.fill(${count+1});" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i+1]}</div>
                        <div class="${count+2}" onclick="gameBoard.fill(${count+2});" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i+2]}</div>
                    </div>    
                `);
             count += 3;
        }
        let a;
        a = store.join(" ");
        body.innerHTML = a;
    }
    const resetBoard = () => {
        console.log("reset board clicked");
        flow = 0;
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        printBoard()
    }
    document.querySelector(".reset-board").addEventListener("click", () => {
        resetBoard();
    })
    printBoard();
    return {fill, printBoard, getBoard, resetFlow}
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
        // printName,
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
        if (board[i] !==  "" && board[i] === board[i+1] && board[i+1] === board[i+2]) {
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
                console.log("Player 1 Wins on first loop", playerOne.printScore());
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
                console.log("Player 2 Wins on first loop", playerTwo.printScore());
            }
        } else if (board[i] !==  "" && board[i] === board[i+3] && board[i+3] === board[i+6]) {
            // "X"
            // "X"
            // "X"
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
                console.log("Player 1 Wins on second loop", playerOne.printScore());
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
                console.log("Player 2 Wins on second loop", playerTwo.printScore());
            }
        } else if (board[i] !==  "" && board[i] === board[i+4] && board[i+4] === board[i+8]) {
            // "X"
            //     "X"
            //         "X"
            gameBoard.resetFlow();
            if (board[i] === "X") {
                playerOne.addScore();
                scoreBoard.setScores();
                console.log("Player 1 Wins on third loop", playerOne.printScore());
            } else {
                playerTwo.addScore();
                scoreBoard.setScores();
                console.log("Player 2 Wins on third loop", playerTwo.printScore());
            }
        }
    }
    return {};
}

// TODO Reset Score


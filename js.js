// Score
//
let p1name;
let p2name;
const submitValue = () => {
    event.preventDefault();
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");

    if (player1.value === "") {
        player1.value = "Player 1";
    }
    if (player2.value === "") {
        player2.value = "Player 2"
    }
    p1name = player1.value;
    p2name = player2.value;
    return {
        p1name,
        p2name
    }
}
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
        return {board};
    }
    return {fill, printBoard, getBoard, resetFlow}
})();
// Object for players

const Player = (name = "player") => {
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
        addScore,
        printScore,
        resetScore,
        name
    }
};

const Logic = () => {
    // 1 3 4
    console.log("Logic called");
    // const board = gameBoard.getBoard;
    const board = gameBoard.getBoard();
    // console.log({board});
    for (let i = 0; i < board.length; i++) {
        if (board[i] !==  "" && board[i] === board[i+1] && board[i+1] === board[i+2]) {
            gameBoard.resetFlow();
            if (board[i] === "X") {
                player1.addScore();
                console.log("Player 1 Wins on first loop", player1.printScore());
            } else {
                player2.addScore();
                console.log("Player 2 Wins on first loop", player2.printScore());
            }
        } else if (board[i] !==  "" && board[i] === board[i+3] && board[i+3] === board[i+6]) {
            gameBoard.resetFlow();
            if (board[i] === "X") {
                player1.addScore();
                console.log("Player 1 Wins on second loop", player1.printScore());
            } else {
                player2.addScore();
                console.log("Player 2 Wins on second loop", player2.printScore());
            }
        } else if (board[i] !==  "" && board[i] === board[i+4] && board[i+4] === board[i+8]) {
            gameBoard.resetFlow();
            if (board[i] === "X") {
                player1.addScore();
                console.log("Player 1 Wins on third loop", player1.printScore());
            } else {
                player2.addScore();
                console.log("Player 2 Wins on third loop", player2.printScore());
            }
        }
    }
    return {};
}

//TODO
// const score = (() => {
//     document.querySelector(".p1-name").value = player1.name;
//     document.querySelector(".p2-name").value = player2.name;
//     document.querySelector(".p1-score").value = player1.printScore();
//     document.querySelector(".p2-score").value = player2.printScore();
//     return {
//
//     }
// })()
// {
//     document.querySelector(".p1-name").value = player1.printScore();
//
// }

const player1 = Player(p1name);
const player2 = Player(p2name);
console.log({player1});
gameBoard.printBoard();



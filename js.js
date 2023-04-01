
// Make gameboard object
// And make gameboard array inside of object
// Flow game time object

const body = document.querySelector(".body");
const gameBoard = (() => {
    // IIFE
    const board = ["", "", "", "", "", "", "", "", ""];

    let flow = 0;
    const checkBoard = () => {
        // const checkAlready = () => {
        //     if (board[count] === "X" || "O") {
        //         console.log("Already picked!", board[count]);
        //         return false;
        //     } else {
        //         return true;
        //     }
        // }
        // if ((flow > 8) || (checkAlready() == true)) {
        if ((flow > 8)) {
            console.log("Flow Ended!");
            return false;
        } else {
            return true;
        }
    };
    const fill = (count = 0) => {
        if (checkBoard()) {
            if (flow % 2 == 0) {
                board[count] = "X";
                flow++;
            } else {
                board[count] = "O";
                flow++;
            }
        }
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
                        <div class="${count}" onclick="gameBoard.fill(${count})" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i]}</div>
                        <div class="${count+1}" onclick="gameBoard.fill(${count+1})" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i+1]}</div>
                        <div class="${count+2}" onclick="gameBoard.fill(${count+2})" style="border: 1px solid black; margin: 2px; height: 20px; width: 20px;">${board[i+2]}</div>
                    </div>    
                `);
             count += 3;
        }
        let a;
        a = store.join(" ");
        body.innerHTML = a;
        return {board};
    }
    return {fill, printBoard}
})();
// Object for players

const player = () => {
    let score = 0;
    const addScore = () => {
        score += 1;
    }
    const removeScore = () => {
        score -= 1;
    }
    const printScore = () => {
        return score;
    }
    return {
        addScore,
        removeScore,
        printScore
    }
};

const player1 = player();
const player2 = player();

player1.addScore();
player2.removeScore();

console.log("player 2: ", player2.printScore());
console.log("board: ", gameBoard.printBoard());
gameBoard.printBoard();



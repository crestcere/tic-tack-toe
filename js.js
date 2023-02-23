// Make gameboard object
// And make gameboard array inside of object
// Flow game time object
const gameBoard = (() => {
    const board = [];
    const flow = 0;
    const checkBoard = () => {};
    const addX = () => {
        checkBoard();
        board.push("X");
    }
    const addO = () => {
        checkBoard();
        board.push("O");
    }
    const printBoard = () => {
        return board;
    }
    return {addX, addO, printBoard}
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

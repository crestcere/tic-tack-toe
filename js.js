// Make gameboard object
// And make gameboard array inside of object

const gameboard = {
    Gameboard: [1, 2, 3]
};


// Object for players

const Players = (score = 0) => {
    let asd = 5;
    const editscore = (arg = "+") => {
        score = 2;
        asd++;
        console.log("called");
        // if (arg == "+") {
        //     // score++;
        //     score = 2;
        //     console.log("score up", score);
        // } else {
        //     score--;
        //     console.log("score down called");
        // }
    }
    return { score, editscore, asd };
}

const player1 = Players(0);
const player2 = Players(1);

player2.editscore();

console.log("player 1: ", player1.score);
console.log("player 2: ", player2.score);
console.log("player 2: ", player2.asd);

// Object for gameflow


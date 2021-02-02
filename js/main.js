const status = document.querySelector("h2");
let activeGame = true;
let activePlayer = "X";
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const victoryConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Column 1
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diag 1
    [2, 4, 6]
]

const win = () => "Le joueur " + activePlayer + " a gagné !";
const equal = () => "Egalité !";
const playerTour = () => "C'est au tour du joueur " + activePlayer;

status.innerHTML = playerTour();

document.querySelectorAll('.case').forEach(cell => cell.addEventListener('click', clickCase));
document.querySelector('#again').addEventListener('click', again);

function clickCase() {
    const indexCase = parseInt(this.dataset.index); // On récupère l'index de la case cliquée

    if (gameStatus[indexCase] !== "" || !activeGame) { // Si index de la case est rempli ou jeu inactif, on arrête
        return;
    }

    gameStatus[indexCase] = activePlayer; // On donne la case cliquée au joueur
    this.innerHTML = activePlayer; // On met le symbole du joueur dans sa case

    isWin(); // Vérifie si gagne
}

function isWin() {
    let winningTour = false;

    for (let victoryCondition of victoryConditions) { // Pour chaque condition de victoire
        let val1 = gameStatus[victoryCondition[0]]; // val1 = etat du jeu (tableau) à l'index de la condition
        let val2 = gameStatus[victoryCondition[1]];
        let val3 = gameStatus[victoryCondition[2]];

        if (val1 === "" || val2 === "" || val3 === "") { // si une des cases est vide on continue
            continue;
        }

        if (val1 === val2 && val2 === val3) { // Est-ce que ces cases remplies appartiennent au même joueur
            winningTour = true; // on attribue la victoire
            break;
        }
    }
    if (winningTour === true) { // si victoire attribuée
        status.innerHTML = win(); // on affiche le message de victoire
        activeGame = false; // jeu terminé
        return;
    }

    if (!gameStatus.includes("")) {
        status.innerHTML = equal();
        activeGame = false;
        return;
    }

    activePlayer = activePlayer === "X" ? "O" : "X";
    status.innerHTML = playerTour();
}

function again() {
    activePlayer = "X";
    activeGame = true;
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    status.innerHTML = playerTour();
    document.querySelectorAll('.case').forEach(cell => cell.innerHTML = "");

}

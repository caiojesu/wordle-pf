import { WORDS } from "../modules/words.js";
import { initialGameState } from "../modules/initial_game_state.js";
import { deleteLetter } from "../modules/game_controller.js";

console.log(initialGameState);

const initBoard = () => {
  const board = document.getElementById("game-board");
 createBoard(board);
}

// A função createBoard tem a função de construir a placa do jogo, que é uma grade de linhas e colunas. Ela aceita um único
//argumento chamado "board" que se encontra no código HTML. Na própria função é determinado o número de tentativas por meio da const
// "NUMBER_OF_GUESSES". Array.from é usado para criar um array de linhas baseado no número de tentativas.  

const createBoard = (board) => {
  const NUMBER_OF_GUESSES = initialGameState.NUMBER_OF_GUESSES;
  const rows = Array.from({ length: NUMBER_OF_GUESSES }, () => createRow());

  rows.forEach((row) => board.appendChild(row));
};

// A função "createRow" cria uma linha para cada elemento do array de linhas (no caso, 6 linhas). É uma função pura pois não 
// depende de variáveis globais e nem causa efeitos colaterais ao restante do código.
const createRow = () => {
  const row = document.createElement("div");
  row.className = "letter-row";

  // A função "columns" cria 5 colunas para cada uma das 6 linhas. Ela também é uma função pura pois não depende de elemntos externos.

  const columns = Array.from({ length: 5 }, () => createColumns());
  columns.forEach((column) => row.appendChild(column));

  return row;
};

// A função createColumns tem a função de adicionar caixas em cada coluna do array de linhas.

const createColumns = () => {
  const box = document.createElement("div");
  box.className = "letter-box";
  return box;
};

// As 3 funções traduzidas anteriomente formam, em conjunto, as grades de letras a qual o usuário irá "escrever".

const shadeKeyBoard = (letter, color) => {
  const keyboardButtons = Array.from(document.getElementsByClassName("keyboard-button"));

    keyboardButtons.forEach((elem) => {
    if (elem.textContent === letter) {
      const oldColor = elem.style.backgroundColor;
      if (oldColor !== "green" && !(oldColor === "yellow" && color !== "green")) {
        elem.style.backgroundColor = color;
      }
    }
  });
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - initialGameState.guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(initialGameState.rightGuessString);

  for (const val of initialGameState.currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    toastr.error("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == initialGameState.currentGuess[i]) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == "green") continue;

    //checking right letters
    for (let j = 0; j < 5; j++) {
      if (rightGuess[j] == initialGameState.currentGuess[i]) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (guessString === initialGameState.rightGuessString) {
    toastr.success("You guessed right! Game over!");
    initialGameState.guessesRemaining = 0;
    return;
  } else {
    initialGameState.guessesRemaining -= 1;
    initialGameState.currentGuess = [];
    initialGameState.nextLetter = 0;

    if (initialGameState.guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right word was: "${initialGameState.rightGuessString}"`);
    }
  }
}

const  insertLetter = (pressedKey) => {
  if (initialGameState.nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - initialGameState.guessesRemaining];
  let box = row.children[initialGameState.nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  initialGameState.currentGuess.push(pressedKey);
  initialGameState.nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("keyup", (e) => {
  if (initialGameState.guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && initialGameState.nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey, initialGameState);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});


initBoard();
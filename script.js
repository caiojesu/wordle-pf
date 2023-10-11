import { WORDS} from "../modules/words.js";
import { initialGameState } from "../modules/initial_game_state.js";
import { deleteLetter } from "../modules/game_controller.js";
import { getBox, getRow} from "../modules/dom_controller.js";


console.log(initialGameState);

// A função "initBoard" traz consigo um código de ID "game-board" proveniente do HTML, que tem como objetivo inicializar o tabuleiro do jogo.
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

// A função "shadeKeyBoard" é responsável por selecionar todos os botões do teclado utilizando a função "array.from" e posteriormente
// percorrendo-os através da função "forEach", com o objetivo de verificar se a letra do botão corresponde com o argumento anteriormente fornecido (letter), e posteriormente 
// modificando a cor de fundo do botão a depender da letra correspondente à palavra, alternando de amarelo ao verde.
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

//A função Checkguess tem como objetivo checar se o número de letras que o usuário colocou é o solicitado,
//Caso o número de letras seja inferior a 6, ele dirá que é insuficiente, e caso a palavra não esteja dentro da lista
//ela é automaticamente rejeitada

const checkGuess = (initialGameState) =>  {
  const row = getRow(initialGameState.guessesRemaining);
  let guessString = "";
  const rightGuess = Array.from(initialGameState.rightGuessString);
  
  // Esse for deve ser substituido por um método funcional
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

// A função a seguir serve para adicionar elementos CSS ao HTML, com o objetivo de controlar o início e o término da animação.
// Nela há 3 argumentos "elemnt" que é o elemento do HTML que receberá a animação, "animation" que é a classe de animação e o "prefix" que adiciona um prefixo à classe de animação.
// Nessa função utilizei o uso de const para obedecer conceitos de imutabilidade e optei por remover o uso de "promessa" sendo ela uma função que não se adequa ao funcional.
const animateCSS = (element, animation, prefix = "animate__") => {
  const animationName = `${prefix}${animation}`;
  const node = element;
  node.style.setProperty("--animate-duration", "0.3s");
  node.classList.add(`${prefix}animated`, animationName);
// A função a seguir interrompe a animação após verificar por meio de comparação se a animação realizada foi a mesma regr=istrada para o elemnto.
  const handleAnimationEnd = (event) => {
    if (event.animationName === animationName) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
    }
  };

  node.addEventListener("animationend", handleAnimationEnd);
};


document.addEventListener("keyup", (e) => {
  const row = getRow(initialGameState.guessesRemaining);
  const box = getBox(row, initialGameState.nextLetter);
  if (initialGameState.guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && initialGameState.nextLetter !== 0) {
    deleteLetter(initialGameState)(box);
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess(initialGameState);
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
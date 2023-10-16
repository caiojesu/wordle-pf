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

  // Use map para criar as novas linhas 
  const newBoard = rows.map((row) => {
    const clonedRow = row.cloneNode(true); // Clona a linha para evitar mutações
    board.appendChild(clonedRow);
    return clonedRow;
  });

  return newBoard;
};
// A função "createRow" cria uma linha para cada elemento do array de linhas (no caso, 6 linhas). É uma função pura pois não 
// depende de variáveis globais e nem causa efeitos colaterais ao restante do código.
const createRow = () => {
  const row = document.createElement("div");
  row.className = "letter-row";

  // A função "columns" cria 5 colunas para cada uma das 6 linhas. Ela também é uma função pura pois não depende de elemntos externos.

  const columns = Array.from({ length: 5 }, () => createColumns());

  // Usa map para adicionar as colunas às linhas
  const Columns = columns.map((column) => {
    row.appendChild(column);
    return column;
  });

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
// percorrendo-os através da função "map", com o objetivo de verificar se a letra do botão corresponde com o argumento anteriormente fornecido (letter), e posteriormente 
// modificando a cor de fundo do botão a depender da letra correspondente à palavra, alternando de amarelo ao verde.
const shadeKeyBoard = (letter, color) => {
  const keyboardButtons = Array.from(document.getElementsByClassName("keyboard-button"));

  // Use map para criar um novo array de elementos com as cores modificadas
  const newKeyboardButtons = keyboardButtons.map((elem) => {
    if (elem.textContent === letter) {
      const oldColor = elem.style.backgroundColor;
      if (oldColor !== "green" && !(oldColor === "yellow" && color !== "green")) {
        // Retorna um novo elemento com a cor modificada
        return { ...elem, style: { ...elem.style, backgroundColor: color } };
      }
    }
    // Retorna o elemento original sem modificações
    return elem;
  });
};

//A função Checkguess tem como objetivo checar se o número de letras que o usuário colocou é o solicitado,
//Caso o número de letras seja inferior a 6, ele dirá que é insuficiente, e caso a palavra não esteja dentro da lista
//ela é automaticamente rejeitada

const checkGuess = (initialGameState) =>  {
  const row = getRow(initialGameState.guessesRemaining);
  const guessString = initialGameState.currentGuess.join('');
  const rightGuess = Array.from(initialGameState.rightGuessString);
  
  if (guessString.length !== 5) {
    toastr.error("Não há letras suficientes!");
    return; }

  if (!WORDS.includes(guessString)) {
    toastr.error("A palavra não está na lista!");
    return; }

  const letterColor = ["gray", "gray", "gray", "gray", "gray"];

  // Usa a função forEach para comparar letra inserida pelo usuário com a letra correspondente da palavra correta. 
  // se a letra estiver contida na palavra e no lugar certo, a cor da letra na caixa correspondente é alterada para verde.
  initialGameState.currentGuess.forEach((val, i) => {
    if (rightGuess[i] === val) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  });

  initialGameState.currentGuess.forEach((guessLetter, i) => {
    if (letterColor[i] === "green") return;
// se houver uma letra correta, porém na caixa errada, essa mesma letra nessa mesma caixa será alterada para a cor amarela.
    rightGuess.forEach((rightLetter, j) => {
      if (rightLetter === guessLetter) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    });
  });
//Usa a função animateCSS para aplicar uma animação ás caixas e a função shadeKeyBoard para alterar as cores do teclado, seguindo a mesma lógica das funções anteriores (verde e amarelo).
  initialGameState.currentGuess.forEach((val, i) => {
    const box = row.children[i];
    const delay = 250 * i;
    setTimeout(() => {
      animateCSS(box, "flipInX");
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i), letterColor[i]);
    }, delay);
  });
// A função abaixo verifica se as "guessString" é igual à a palavra correta, se sim, exibe uma mensagem de sucesso. Se não, decresce do número de tentativas e o jogo continua.
  if (guessString === initialGameState.rightGuessString) {
    toastr.success("Você acertou. Fim de jogo!");
    initialGameState.guessesRemaining = 0;
    localStorage.removeItem("WORDS");
  } else {
    initialGameState.guessesRemaining -= 1;
    initialGameState.currentGuess = [];
    initialGameState.nextLetter = 0;
// Verifica se o número de chances é igual a 0, se sim, exibe um aviso e uma mensagem informando a palavra correta.
    if (initialGameState.guessesRemaining === 0) {
      toastr.error("Você esgotou as chances! Game Over!");
      toastr.info(`A palavra correta era: "${initialGameState.rightGuessString}"`);
      localStorage.removeItem("WORDS");
    }
  }
}

const insertLetter = (pressedKey, initialGameState) => {
  if (initialGameState.nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  const row = getRow(initialGameState.guessesRemaining);
  const box = row.children[initialGameState.nextLetter];
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


// A função é responsável por admnistrar a entrada do usuário no jogo, verificando as teclas pressionadas e realizando ações com base nas teclas pressionadas, 
//como inserir letras, apagar letras e verificar a tentativa do usuário.
const handleKeyPress = (e, initialGameState) => {
  if (initialGameState.guessesRemaining === 0) {
    return;
  }

  const pressedKey = String(e.key);

  if (pressedKey === "Backspace" && initialGameState.nextLetter !== 0) {
    deleteLetter(initialGameState)(box);
  } else if (pressedKey === "Enter") {
    checkGuess(initialGameState);
  } else {
    const found = pressedKey.match(/[a-z]/gi);
    if (found && found.length === 1) {
      insertLetter(pressedKey, initialGameState);
    }
  }
};

// Adicione um ouvinte de evento para o evento de pressionar uma tecla
document.addEventListener("keyup", (e) => {
  const row = getRow(initialGameState.guessesRemaining);
  const box = getBox(row, initialGameState.nextLetter);
  handleKeyPress(e, initialGameState);
});

// Adicione um ouvinte de evento para o evento de clique no teclado virtual
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("keyboard-button")) {
    let key = target.textContent;
    if (key === "Del") {
      key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  }
});


initBoard();
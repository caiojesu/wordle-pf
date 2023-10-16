import { WORDS } from "./words.js";

// O objeto initialGameState armazena o estado inicial do jogo. 
export const initialGameState = {
    NUMBER_OF_GUESSES: 6, // representa o número de tentativas iniciais 
    guessesRemaining: 6, // representa o número de tentativas restantes ao partir do início
    currentGuess: [], // representa o array das grades em que o jogador terá que inserir as letras
    nextLetter: 0, // representa a posição na linha a qual o jogador terá que inserir a letra
    rightGuessString: WORDS[Math.floor(Math.random() * WORDS.length)], // essa função retorna uma palavra aleatória do array WORDS e que terá que ser advinhada pelo jogador.
};

// Atualiza um objeto state sobrescrevendo por outro objeto state 
export const updateGameState = (state) => (updatedGameState) => {
    Object.assign(state, updatedGameState);
}
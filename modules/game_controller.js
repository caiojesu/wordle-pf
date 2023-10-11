import { initialGameState, updateGameState } from "./initial_game_state.js";
import {clearBoxContent } from "./dom_controller.js";


// Apaga a letra de uma caixa selecionada e atualiza o estado fornecido
export const deleteLetter = (state) => (box) => {
    clearBoxContent(box);

    const updatedGameState = { ...state };
    removeLastLetterFromCurrentGuess(updatedGameState);
    decrementNextLetterIndex(updatedGameState);
    updateGameState(state)(updatedGameState);
}

// Remove a última letra da tentativa atual no estado fornecido
const removeLastLetterFromCurrentGuess = (state) => {
    state.currentGuess = [...initialGameState.currentGuess];
    state.currentGuess.pop();
}

// Decrementa em 1 o índice da próxima letra no estado fornecido
const decrementNextLetterIndex = (state) => state.nextLetter -= 1;


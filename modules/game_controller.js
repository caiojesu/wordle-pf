import { initialGameState } from "./initial_game_state.js";
import { getBox, getRow } from "./dom_controller.js";

// A função a seguir apaga a última letra digitada pelo jogador, retomando-o 1 à posição anterior.
export const deleteLetter = () => {
    const row = getRow(initialGameState.guessesRemaining);
    const box = getBox(row, initialGameState.nextLetter);
    box.textContent = "";
    box.classList.remove("filled-box");
    initialGameState.currentGuess.pop();
    initialGameState.nextLetter -= 1;
}
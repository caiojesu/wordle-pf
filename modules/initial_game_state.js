import { WORDS } from "./words.js";

// O objeto initialGameState armazena o estado inicial do jogo
export const initialGameState = {
    NUMBER_OF_GUESSES: 6,
    guessesRemaining: 6,
    currentGuess: [],
    nextLetter: 0,
    rightGuessString: WORDS[Math.floor(Math.random() * WORDS.length)],
};
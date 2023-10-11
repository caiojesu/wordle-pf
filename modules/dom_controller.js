// Retorna a linha atual com base no número de tentativas restantes.
export const getRow = (guessesRemaining) => {
    return document.getElementsByClassName("letter-row")[6 - guessesRemaining];
};
  
// Retorna a caixa atual de acordo com a linha escolhida e a próxima caixa.
export const getBox = (row, nextLetter) => {
    return row.children[nextLetter - 1];
};

// Retorna a linha atual com base no número de tentativas restantes.
export const getRow = (guessesRemaining) => {
    console.log(guessesRemaining);
    return document.getElementsByClassName("letter-row")[6 - guessesRemaining];
};
  
// Retorna a caixa atual de acordo com a linha escolhida e a próxima caixa.
export const getBox = (row, nextLetter) => {
    return row.children[nextLetter - 1];
};

// Limpa o conteúdo da caixa escolhida 
export const clearBoxContent = (box) => {
    box.textContent = "";
    box.classList.remove("filled-box");
}
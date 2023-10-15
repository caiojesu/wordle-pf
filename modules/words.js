const ARRAY_ANIMAIS = ['panda', 'porco', 'pulga'];
const ARRAY_OBJETOS = ['bolsa', 'pente', 'mouse'];
const ARRAY_NOMES = ['pedro', 'andre', 'lucas'];
const ARRAY_VERBOS = ['matar', 'comer', 'beber'];
export const WORDS = localStorage.getItem("WORDS")?.split(',') || [];

document.addEventListener("DOMContentLoaded", () => {
  const botao1 = document.getElementById("botao-1");
  const botao2 = document.getElementById("botao-2");
  const botao3 = document.getElementById("botao-3");
  const botao4 = document.getElementById("botao-4");

  const atualizarWords = (array) => {
    WORDS.push(...array);
    console.log("WORDS atualizado com sucesso.");
    localStorage.setItem("WORDS", WORDS);
  }

  botao1.addEventListener("click", () => {
    atualizarWords(ARRAY_ANIMAIS);
  });

  botao2.addEventListener("click", () => {
    atualizarWords(ARRAY_OBJETOS);
  });

  botao3.addEventListener("click", () => {
    atualizarWords(ARRAY_NOMES);
  });

  botao4.addEventListener("click", () => {
    atualizarWords(ARRAY_VERBOS);
  });
});







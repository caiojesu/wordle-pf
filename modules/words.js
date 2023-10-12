const ARRAY_ANIMAIS = ['panda', 'porco', 'pulga'];
const ARRAY_OBJETOS = ['bolsa', 'pente', 'mouse'];
const ARRAY_NOMES = ['pedro', 'andre', 'lucas'];
const ARRAY_VERBOS = ['matar', 'comer', 'beber'];
export let WORDS = ['garfo', 'foice', 'jarro' ];

document.addEventListener("DOMContentLoaded", function () {
  const botao1 = document.getElementById("botao-1");
  const botao2 = document.getElementById("botao-2");
  const botao3 = document.getElementById("botao-3");
  const botao4 = document.getElementById("botao-4");

  function atualizarWords(array) {
    WORDS = [...array];
    console.log("WORDS atualizado com sucesso.");
  }

  botao1.addEventListener("click", function () {
    atualizarWords(ARRAY_ANIMAIS);
  });

  botao2.addEventListener("click", function () {
    atualizarWords(ARRAY_OBJETOS);
  });

  botao3.addEventListener("click", function () {
    atualizarWords(ARRAY_NOMES);
  });

  botao4.addEventListener("click", function () {
    atualizarWords(ARRAY_VERBOS);
  });
});







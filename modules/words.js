//arrays de listas com as palavras relacionadas aos temas que o usuário for escolher.
const ARRAY_ANIMAIS = ['panda', 'porco', 'pulga', 'pombo', 'aguia', 'cupim', 'corvo', 'cisne', 'cabra', 'bisao', 'cobra', 'arara'];
const ARRAY_OBJETOS = ['bolsa', 'pente', 'mouse', 'prato', 'porta', 'vasos', 'jarro','livro', 'lapis', 'pedra'];
const ARRAY_NOMES = ['pedro', 'andre', 'lucas','luisa','maria','julia', 'lucia', 'suzan', 'elisa', 'marco'];
const ARRAY_VERBOS = ['matar', 'comer', 'beber', 'casar', 'latir','parir','tirar','posar','polir'];
export const WORDS = localStorage.getItem("WORDS")?.split(',') || [];

document.addEventListener("DOMContentLoaded", () => {
  const botao1 = document.getElementById("botao-1");
  const botao2 = document.getElementById("botao-2");
  const botao3 = document.getElementById("botao-3");
  const botao4 = document.getElementById("botao-4");

  // A função a seguir recebe como parâmetro um array específico e tem como objetivo adicionar os elemntos desse array no array vazio WORDS
  const atualizarWords = (array) => {
    WORDS.push(...array);
    console.log("WORDS atualizado com sucesso.");
    localStorage.setItem("WORDS", WORDS);
  }
  
  // As 4 funções a seguir recebem a função "atualizarWORDS" que também recebe como parâmetro um array de listas relacionado ao botão que for clicado,
  // ou seja, se por exemplo o botão "animais" for clicado, o array vazio WORDS recebe os elemtentos do ARRAY_ANIMAIS, e assim a mesma lógica para os demais eventos.
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







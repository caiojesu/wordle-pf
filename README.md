# wordle-pf

Repositório referencia: https://github.com/Morgenstern2573/wordle_clone


## Estrutura do Projeto

```
├── modules
│   ├── dom_controller.js
│   ├── initial_game_state.js
│   └── words.js 
├── view
│   ├── css
│   ├── board_game.html
│   └── home_page.html          
└── main.js
```

* `modules` : Esta pasta contém todos os arquivos JavaScript que compõem a lógica do jogo.
    * `dom_controller.js` : Este arquivo contém o código responsável por controlar a manipulação da interface do usuário e realizar alterações visuais.
    * `initial_game_state.js` : Este arquivo mantém o estado inicial do jogo, incluindo informações como o número de tentativas, a palavra a ser adivinhada e o progresso atual.
    * `game_controller.js` : Este arquivo contém o código responsável por controlar o estado do jogo.
    * `words.js` : Este arquivo contém uma lista de palavras que serão usadas no jogo.
* `view` : Esta pasta contém os arquivos relacionados à interface do usuário.
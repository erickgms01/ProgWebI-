let randomNumber = Math.floor(Math.random() * 100) + 1;
      const guesses = document.querySelector('.guesses');
      const lastResult = document.querySelector('.lastResult');
      const lowOrHi = document.querySelector('.lowOrHi');
      const guessSubmit = document.querySelector('.guessSubmit');
      const guessField = document.querySelector('.guessField');
      const mainElement = document.getElementById('main')
      let guessCount = 1;
      let resetButton;

      function checkGuess() {
        const userGuess = Number(guessField.value);
        if (guessCount === 1) {
          guesses.textContent = 'Histórico: ';
        }

        guesses.textContent += userGuess + ' ';

        if (userGuess === randomNumber) {
          lastResult.textContent = 'Parabéns! Você acertou!';
          lastResult.style.color = 'green';
          lowOrHi.textContent = '';
          setGameOver();
        } else if (guessCount === 10) {
          lastResult.textContent = '!!!GAME OVER!!!';
          lowOrHi.textContent = '';
          setGameOver();
        } else {
          lastResult.textContent = 'Errado!';
          lastResult.style.color = 'red';
          if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Seu número foi muito baixo!' ;
          } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Seu número foi muito alto!';
          }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
      }

      guessSubmit.addEventListener('click', checkGuess);

      function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Começar novo jogo!';
        main.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
      }

      function resetGame() {
        guessCount = 1;
        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
          resetPara.textContent = '';
        }


        resetButton.parentNode.removeChild(resetButton);
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();
        lastResult.style.backgroundColor = 'white';
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
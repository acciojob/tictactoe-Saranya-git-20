const submitBtn = document.getElementById('submit');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const messageDiv = document.querySelector('.message');
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const gameBoard = document.getElementById('game-board');

    let currentPlayer = 'X';
    let player1 = '';
    let player2 = '';
    let gameActive = true;

    const winningCombos = [
      [1,2,3],[4,5,6],[7,8,9], // rows
      [1,4,7],[2,5,8],[3,6,9], // columns
      [1,5,9],[3,5,7]          // diagonals
    ];

    const getCurrentPlayerName = () => currentPlayer === 'X' ? player1 : player2;

    submitBtn.addEventListener('click', () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (!player1 || !player2) {
        alert('Please enter names for both players!');
        return;
      }

      document.getElementById('player-form').style.display = 'none';
      gameBoard.style.display = 'block';
      messageDiv.textContent = `${player1}, you're up`;
    });

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!gameActive || cell.textContent !== '') return;

        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
          messageDiv.textContent = `${getCurrentPlayerName()} congratulations you won!`;
          gameActive = false;
          return;
        }

        if ([...cells].every(c => c.textContent !== '')) {
          messageDiv.textContent = "It's a draw!";
          return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageDiv.textContent = `${getCurrentPlayerName()}, you're up`;
      });
    });

    function checkWin(symbol) {
      return winningCombos.some(combo => 
        combo.every(id => document.getElementById(id).textContent === symbol)
      );
    }
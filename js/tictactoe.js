const playGroundBox = document.querySelectorAll('#play-ground div');
const pVsP = document.querySelector('.player-vs-player');
const pVsAi = document.querySelector('.player-vs-ai');
const togglePlayerTurn = document.querySelector('.toggle-player-turn');

/* gameMode is following module pattern */
const gameMode = (() => {
  //Checking any move (i.e. 'X' or 'O') is repeated three times in a row
  const matchArr = [
    ['1', '2', '3'], // ---
    ['4', '5', '6'], // ---
    ['7', '8', '9'], // ---
    ['1', '4', '7'], // |
    ['2', '5', '8'], // |
    ['3', '6', '9'], // |
    ['1', '5', '9'], // \
    ['3', '5', '7'], // /
  ];

  /*it will check the subarray of given arrays into matchCheck function and return true or false based on matchCheck result */
  const checkForWin = (array) => {
    let truthCheck = false;
    let winningPlayer;
    array.forEach((arr) => {
      winningPlayer = arr[0];
      if (matchCheck(...arr)) {
        truthCheck = true;
      }
    });
    if (truthCheck) return winningPlayer;
  };

  //return the inner text of the gameboard boxes
  const selectedBoxText = (number) => {
    const boxElem = document.querySelector(`.box-${number}`);
    return boxElem.innerText;
  };
  // check whether any move appears three in a row or not
  const matchCheck = (checkOne, checkTwo, checkThree) => {
    matchOne = selectedBoxText(checkOne);
    matchTwo = selectedBoxText(checkTwo);
    matchThree = selectedBoxText(checkThree);
    if (matchOne === '' || matchTwo === '' || matchThree === '') {
      return false;
    }

    if (
      matchOne === matchTwo &&
      matchTwo === matchThree &&
      matchThree === matchOne
    ) {
      return true;
    } else {
      return false;
    }
  };

  const playerVsPlayer = () => {
    //the first player move will be 'X'
    let boxValue = 'X';

    playGroundBox.forEach((elem) =>
      elem.addEventListener('click', () => {
        /* toggling the move from player to player */
        if (
          elem.innerText === '' &&
          elem.innerText !== 'X' &&
          elem.innerText !== 'O'
        ) {
          if (boxValue === 'X') {
            boxValue = 'O';
          } else {
            boxValue = 'X';
          }
          elem.innerText = boxValue;
        }
        //toggle text to show which player's turn
        if (boxValue === 'O') {
          togglePlayerTurn.textContent = `Player X's turn`;
        } else {
          togglePlayerTurn.textContent = `Player O's turn`;
        }

        //the box value will be the winning players move
        if (checkForWin(matchArr)) {
          console.log(`game Finished: ${boxValue}  has won!`);
        }
      })
    );
  };

  const playerVsAi = () => {
    let randomNumContainer = [];

    playGroundBox.forEach((elem) => {
      elem.addEventListener('click', () => {
        let boxValue = 'X';
        if (elem.textContent === '') {
          if (elem.textContent !== 'O') {
            randomNumContainer.push(elem.dataset.boxNum);
            elem.textContent = 'X';
            boxValue = 'X';
          }
          setTimeout(() => {
            const boxElem = document.querySelector(`.box-${generateMove()}`);
            boxElem !== null ? (boxElem.textContent = 'O') : '';
            boxValue = 'O';
          }, 500);
        }
        setTimeout(() => {
          if (checkForWin(matchArr)) {
            console.log(`game finished: ${boxValue} has won`);
          }
        }, 550);
      });
    });

    //generating a random num from 1 - 9 until the game is over
    const generateMove = () => {
      let randomNum = Math.floor(Math.random() * (10 - 1) + 1);

      if (randomNumContainer.length === 9) {
        return false;
      }

      const found = randomNumContainer.find((num) => num == randomNum);

      if (!found) {
        randomNumContainer.push(randomNum);
        return randomNum;
      } else {
        return generateMove();
      }
    };
  };
  return { playerVsPlayer, playerVsAi };
})();

gameMode.playerVsPlayer();
// gameMode.playerVsAi();

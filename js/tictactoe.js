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
      if (matchCheck(...arr)) {
        winningPlayer = arr[0];
        truthCheck = true;
      }
    });
    if (truthCheck) {
      return winningPlayer;
    }
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
    //first player turn will be 'X'
    togglePlayerTurn.textContent = "player X's turn";
    //first player move will be 'X'
    let boxValue = 'O';

    //if the array size is 9 and not found any winner then the match will be draw
    let drawCheck = [];

    playGroundBox.forEach((elem) =>
      elem.addEventListener('click', () => {
        /* toggling the move from player to player */
        if (
          elem.innerText === '' &&
          elem.innerText !== 'X' &&
          elem.innerText !== 'O'
        ) {
          if (boxValue === 'O') {
            boxValue = 'X';
            drawCheck.push(boxValue);
          } else {
            boxValue = 'O';
            drawCheck.push(boxValue);
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
          const boxElem = document.querySelector(
            `.box-${checkForWin(matchArr)}`
          );
          console.log(`game Finished: ${boxElem.textContent}  has won!`);
        } else {
          if (drawCheck.length === 9) {
            console.log(`game is draw: try again`);
          }
        }
      })
    );
  };

  const playerVsAi = () => {
    //first move will be from player
    togglePlayerTurn.textContent = "player's turn";

    //containing unique numbers from generateMove and player clicking boxes dataSet(boxNum)
    let randomNumContainer = [];

    playGroundBox.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (elem.textContent === '') {
          //giving player informaiton that ai is deciding
          togglePlayerTurn.textContent = 'Wait for Ai';

          //player move
          if (elem.textContent !== 'O') {
            randomNumContainer.push(elem.dataset.boxNum);
            elem.textContent = 'X';
          }

          //Ai move
          setTimeout(() => {
            const boxElem = document.querySelector(`.box-${generateMove()}`);
            boxElem !== null ? (boxElem.textContent = 'O') : '';
            togglePlayerTurn.textContent = "player's turn";
          }, 500);

          //if the result is not produced for 'X' then the result may be produced from 'O'
          if (checkForWin(matchArr)) {
            //resullt for player
            setTimeout(() => {
              resultOfGame();
            }, 550);
          } else {
            //result for AI
            setTimeout(() => {
              resultOfGame();
            }, 550);
          }
        }
      });
    });

    //producing result after checking for winner
    const resultOfGame = () => {
      if (checkForWin(matchArr)) {
        const boxElem = document.querySelector(`.box-${checkForWin(matchArr)}`);
        let winner = boxElem.innerText === 'X' ? 'player' : 'AI';
        console.log(`game finished: ${winner} has won`);
      } else {
        if (randomNumContainer.length === 9) {
          console.log('match is draw! try again');
        }
      }
    };

    //generating a random num from 1 - 9 until the game is over
    const generateMove = () => {
      // this is preventing maximum call stack size error
      if (randomNumContainer.length === 9) {
        return false;
      }

      //random number between 1 - 9
      let randomNum = Math.floor(Math.random() * (10 - 1) + 1);

      //checking that the number is available in randomNumContainer or not
      const found = randomNumContainer.find((num) => num == randomNum);

      if (!found) {
        randomNumContainer.push(randomNum);
        return randomNum;
      } else {
        return generateMove();
      }
    };
  };

  //returning two game mode
  return { playerVsPlayer, playerVsAi };
})();

// gameMode.playerVsPlayer();
gameMode.playerVsAi();

//todo
/*
  4. toggle the game mode after clicking the playerVsPlayer or playerVsAi button in index.html
  5. add beautiful layout for the gameboard
  6 add animation when the game first load
*/

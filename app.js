/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Games values
let min = 1,
  max = 10,
  winningNumber = getRandomNum(max, min),
  guessesLeft = 3;

//   UI Elements
const game = document.querySelector("#game"),
  minNumber = document.querySelector(".min-num"),
  maxNumber = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNumber.textContent = min;
maxNumber.textContent = max;

// Play again and reload

game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please, enter a number between ${min} and ${max}`, "red");
    return;
  }

  //   Check if won

  if (guess === winningNumber) {
    gameOver(true, `${winningNumber} is correct🥳! YOU WON!`);
  } else {
    guessesLeft -= 1;
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    guessInput.value = "";
    if (guessesLeft === 0) {
      gameOver(false, `Game over. You lost 😭 correct number was ${guess}`);
      guessInput.remove();
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  guessBtn.value = "Play again";
  guessBtn.style.borderColor = "black";
  guessBtn.className += "play-again";
}

function getRandomNum(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

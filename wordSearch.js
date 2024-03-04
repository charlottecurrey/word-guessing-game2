let currentWord = {};
let currentHint = ""; 
let maxGuesses = 6;
let remainingGuesses = maxGuesses;
let wrongGuesses = [];
let timer = 20;
let timerRunning = false;
let timerInterval;
let wordGenerated = false;
let score = 0;

function generateRandomWord() {
  let randomIndex = Math.floor(Math.random() * wordArray.length);
  currentWord = wordArray[randomIndex];
  // Set the hint for the current word
  currentHint = currentWord.hint; 
  console.log(currentWord.word);
  renderInputBoxes();
  updateInstructions();

  console.log("1st:", timerRunning);
  if (!timerRunning) {
    console.log("2nd:", timerRunning);
    console.log("hello", timer);
    timerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    // Reset the timer value to 15 seconds
    updateTimer();
  }
}

const correctWordElement = document.querySelector('.correct-word');


function updateTimer() {
  const timerElement = document.querySelector('.timer');

  if (timer <= 0 && !wordGenerated) {
    console.log('Time has run out!');
    remainingGuesses = maxGuesses; 
    clearInterval(timerInterval);
    timerRunning = false;

    timerElement.textContent = 'Your time has run out. Reset the game';
    // Display the correct word
    correctWordElement.textContent = `Correct Word: ${currentWord.word}`;

    
  } else if (timer > 0) {
    timerElement.textContent = `Time: ${timer}`;
    timer--;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timer = 20;
  updateTimer();
}

function renderInputBoxes() {
  const inputContainer = document.querySelector('.inputs');
  const inputBoxes = inputContainer.querySelectorAll('input');

  // Clear any existing input boxes
  inputBoxes.forEach((input) => inputContainer.removeChild(input));

  // Create input boxes for the new word
  for (let i = 0; i < currentWord.word.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1; // Set the maxlength to 1
    inputContainer.appendChild(input);

    // Add event listener for the input event
    input.addEventListener('input', handleInput);
  }
}

function handleInput(event) {
  const input = event.target;
  const value = input.value;

  if (value.length === 1) {
    // Find the next input box
    const nextInput = input.nextElementSibling;

    if (nextInput) {
  // Set focus to the next input box
      nextInput.focus(); 
    } else {
      checkGuess();
    }
  }
}

function checkGuess() {
  let inputContainer = document.querySelector('.inputs');
  let inputs = inputContainer.getElementsByTagName('input');
  let guessedWord = '';
  let incorrectLetters = [];

  for (let i = 0; i < inputs.length; i++) {
    let inputValue = inputs[i].value.toLowerCase();
    guessedWord += inputValue;

    if (guessedWord === currentWord.word) {
      console.log('Correct guess!');
      remainingGuesses = maxGuesses;
      wordGenerated = true; 
      showWinMessage();
      resetTimer();
  
      score++;
  
      // Update the score 
      const scoreElement = document.querySelector('.score');
      scoreElement.textContent = `Score: ${score}`;
    }
    if (!currentWord.word.includes(inputValue)) {
      incorrectLetters.push(inputValue);
      inputs[i].style.backgroundColor = 'red';
    } else if (inputValue !== currentWord.word[i]) {
      // Clear the input field if the correct letter is in the wrong spot
      inputs[i].value = '';
    } else {
      inputs[i].style.backgroundColor = 'green';
    }
    
  }

  remainingGuesses--;

  if (guessedWord === currentWord.word) {
    console.log('Correct guess!');
    remainingGuesses = maxGuesses;
    wordGenerated = true; 
    showWinMessage();
    resetTimer(); 
  } else if (remainingGuesses === 0) {
    console.log('No more guesses. The correct word is: ' + currentWord.word);
    remainingGuesses = maxGuesses;
    generateRandomWord();
  }

  wrongGuesses = incorrectLetters;
  updateInstructions();
}


function showWinMessage() {
  const winMessage = document.querySelector('.win-message');
  winMessage.textContent = 'You are a Winner! Press Reset Game';

  setTimeout(() => {
    winMessage.textContent = '';
  }, 3000);
}


function updateInstructions() {
  const remainingElement = document.querySelector('.remaining');
  const wrongElement = document.querySelector('.wrong');
  const hintElement = document.querySelector('.hint');

  remainingElement.textContent = `Remaining Guesses: ${remainingGuesses}`;
  wrongElement.textContent = `Wrong Letters: ${wrongGuesses.join(', ')}`;
  hintElement.textContent = `Hint: ${currentHint}`;
}

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetGame);

const winMessage = document.querySelector('.win-message');

function resetGame() {
  remainingGuesses = maxGuesses;
  wrongGuesses = [];
  
  // Clear the content of the win message
  winMessage.textContent = ''; 
  correctWordElement.textContent = '';

  clearInterval(timerInterval); 
  timerRunning = false; 
  timer = 20;
  
  updateInstructions();
  generateRandomWord();
}

generateRandomWord();



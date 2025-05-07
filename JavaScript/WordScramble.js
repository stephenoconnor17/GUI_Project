const wordsByLength = {
  4: ["luck", "code", "dark", "hope", "game"],
  5: ["plant", "stone", "heart", "dream", "cloud"],
  6: ["castle", "future", "silver", "forest", "planet"],
  7: ["journal", "venture", "orbiting", "elastic", "picture"],
  8: ["triangle", "strategy", "umbrella", "sandwich", "midnight"],
  9: ["complicated", "appreciation", "misguided", "magnitude", "education"]
};

let currentLevel = 1;
let wordLength = 4;
let currentWord = "";
let scrambled = "";
let score = 0;
let attempts = 3;
let correctStreak = 0;

function scrambleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function pickNewWord() {
  const pool = wordsByLength[wordLength] || wordsByLength[9];
  currentWord = pool[Math.floor(Math.random() * pool.length)];
  scrambled = scrambleWord(currentWord);
  document.getElementById("scrambled-word").textContent = scrambled.toUpperCase();
  document.getElementById("user-input").value = "";
  attempts = 3;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("message").textContent = "";
  document.getElementById("level").textContent = currentLevel;
}

function checkGuess() {
  const input = document.getElementById("user-input").value.toLowerCase();

  if (input === currentWord) {
    score += 100;
    correctStreak++;
    document.getElementById("message").textContent = " Correct! +100 Points!";
    document.getElementById("score").textContent = score;

    // After 3 correct in a row, level up
    if (correctStreak === 3 && wordLength < 9) {
      currentLevel++;
      wordLength++;
      correctStreak = 0;
      alert(` Level up! Now playing with ${wordLength}-letter words!`);
    }

    pickNewWord();
  } else {
    attempts--;
    correctStreak = 0; // Reset streak on wrong answer

    if (attempts > 0) {
      document.getElementById("message").textContent = " Wrong! Try again.";
      document.getElementById("attempts").textContent = attempts;
    } else {
      document.getElementById("message").textContent = ` Out of attempts! The word was: ${currentWord}`;
      pickNewWord();
    }
  }
}




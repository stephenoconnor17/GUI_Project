const wordList = [
  "heart", "castle", "bridge", "python", "dream", "planet", "silver", "forest", "future", "random"
];

let currentWord = "";
let scrambled = "";
let score = 0;
let attempts = 3;

function scrambleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function pickNewWord() {
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  scrambled = scrambleWord(currentWord);
  document.getElementById("scrambled-word").textContent = scrambled.toUpperCase();
  document.getElementById("user-input").value = "";
  attempts = 3;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("message").textContent = "";
}

function checkGuess() {
  const input = document.getElementById("user-input").value.toLowerCase();

  if (input === currentWord) {
    score += 100;
    document.getElementById("message").textContent = "Correct! +100 Points!";
    document.getElementById("score").textContent = score;
    pickNewWord();
  } else {
    attempts--;
    if (attempts > 0) {
      document.getElementById("message").textContent = `Wrong! Try again.`;
      document.getElementById("attempts").textContent = attempts;
    } else {
      document.getElementById("message").textContent = `Out of attempts! The word was: ${currentWord}`;
      pickNewWord();
    }
  }
}

// Initialize game on load
window.onload = pickNewWord;


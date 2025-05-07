//By Malachy Lindner

//Array of three letter words
const threeLetterWords = [
  "ace", "act", "add", "age", "ago", "aid", "aim", "air", "and", "ant",
  "any", "ape", "app", "are", "arm", "art", "ash", "ask", "ate", "awe",
  "bad", "bag", "ban", "bar", "bat", "bay", "bed", "bee", "beg", "bet",
  "bid", "big", "bin", "bit", "bob", "bog", "boo", "box", "boy", "bun",
  "bus", "but", "buy", "cab", "can", "cap", "car", "cat", "cow", "cry",
  "cup", "cut", "dad", "dam", "day", "den", "dew", "did", "die", "dig",
  "dim", "dip", "dog", "dot", "dry", "due", "dug", "ear", "eat", "egg",
  "end", "era", "eve", "eye", "fan", "far", "fat", "fax", "fed", "fee",
  "few", "fig", "fin", "fit", "fix", "fly", "fog", "for", "fox", "fun",
  "fur", "gas", "get", "gig", "gin", "got", "gum", "gun", "gut", "guy",
  "gym", "had", "ham", "has", "hat", "hay", "her", "hey", "hid", "him",
  "hip", "his", "hit", "hog", "hop", "hot", "how", "hug", "hum", "ice",
  "ill", "ink", "inn", "jam", "jar", "jaw", "jet", "job", "jog", "joy",
  "jug", "key", "kid", "kit", "lab", "lad", "lag", "lap", "law", "lay",
  "led", "leg", "let", "lid", "lie", "lip", "lit", "log", "lot", "low",
  "mad", "man", "map", "mat", "may", "men", "met", "mix", "mob", "mom",
  "mop", "mud", "mug", "nap", "net", "new", "nod", "not", "now", "nut",
  "oak", "odd", "off", "oil", "old", "one", "opt", "our", "out", "owl",
  "own", "pad", "pan", "pat", "pay", "pea", "pen", "pet", "pie", "pig",
  "pin", "pit", "pop", "pot", "pro", "pub", "pun", "put", "rag", "ram",
  "ran", "rap", "rat", "raw", "red", "rib", "rid", "rig", "rim", "rip",
  "rob", "rod", "rot", "row", "rub", "rug", "run", "sad", "sag", "sap",
  "sat", "saw", "say", "sea", "see", "set", "sew", "she", "shy", "sip",
  "sir", "sit", "six", "ski", "sky", "sob", "son", "sow", "sun", "sup",
  "tab", "tag", "tan", "tap", "tar", "tax", "tea", "ten", "the", "tie",
  "tip", "toe", "top", "toy", "try", "tub", "tug", "two", "use", "van",
  "vet", "vow", "war", "was", "wax", "way", "web", "wet", "who", "why",
  "win", "wit", "wow", "yak", "yam", "yap", "yaw", "yay", "yea", "yes",
  "yet", "you", "zip", "zoo"
];

// Function to pick a random word
function getrandomword()
{
  let index = Math.floor(Math.random() * threeLetterWords.length);
  return threeLetterWords[index];
}

// variables for the start and finsihing word
let startingword = getrandomword();
let finishingword = getrandomword();

let currentword = startingword;
let lives = 3;

// displaying the words and lives
document.getElementById("startWord").textContent = startingword;
document.getElementById("endWord").textContent = finishingword;
document.getElementById("currentWord").textContent = currentword;
document.getElementById("lives").textContent = lives;


// This function checks if if the inputted word is in the list
function isvalidword(word)
{
  return threeLetterWords.includes(word);
}

//function to submit guess which in turn also runs other functions if certain errors are made
function submitguess()
{
  var input = document.getElementById("guessInput").value;
  var message = document.getElementById("message");


  //makes sure its a valid word
  if(!isvalidword(input))
  {
    lives--;
    document.getElementById("lives").textContent = lives;
    message.textContent = "Not a Valid Word. Lives Left: " + lives;
    
    // if the lives reach zero its game over

    if (lives === 0)
    {
      message.textContent = "Game Over";
      disableinput();
    }
    return;
  }
  //updates the word if the change is valid
  currentWord = input;
  document.getElementById("currentWord").textContent = currentword;
  message.textContent = "Well Done";
  // checks if start word and end word are the same
  if (currentword === finishingword)
  {
    message.textContent = "Congrats. You reached the end word!"
  }
}

//this function disables any user input
function disableinput()
{
  document.getElementById("guessInput").disabled = true;
}

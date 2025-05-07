//This function basically sets up the game once play and play again are clicked.
//make sure display texts are defaulted aswell.
function revealLetters(){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
    document.getElementById("mainGameContainer").style.display = "grid";
    document.getElementById("gameOver").style.display = "none";

    document.getElementById("returnValidation").innerText = "";
    document.getElementById("returnValidation2").innerText = "";

    setDefault();

    updateScore(score);
    updateTries(tries);

    restartAnimation();
}


//return variables to default values.
function setDefault(){
    round = 1;
    score = 0;
    tries = 5;
    userInputLetters = [];
    pastUserInputs = [];
    document.getElementById("wordInput").value = "";
}

function restartAnimation() {
    assignLetters();
    let items = document.querySelectorAll(".item");

    /*
    parts of the code were taken from chatgpt.
    so basically what this code does is that it gathers all items,
    which are the letters to be revealed and then words are to be made out of them
    and removes their initial css style of animation and resets their opacity to 0.
    */
    items.forEach(item => {
        item.style.animation = "none"; // Remove animation
        item.style.opacity = "0"; // Ensure it fully disappears

        //here the setTimeout has 2 paramaters, function and then time in miliseconds.
        //Here we just describe the function within the paramater as to keep cleanliness

        setTimeout(() => {
            item.style.animation = "fadeIn 1s forwards"; 
        }, 150);
    });

    document.getElementById("round").innerHTML = "-" + (round) + "-";
    round++;
    if(round > 6){
        document.getElementById("mainGameContainer").style.display = "none";
        document.getElementById("gameOver").style.display = "grid";
        document.getElementById("scoreDisplay").innerHTML = "Your final score: " + score;
    }
}

let currentLetters = ["","","","","","","",""];

/*
function assignLetters(){
    //This functions is pretty straightforward, 
    //get random number, assign nth item a letter in the array at index random number.

    let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let item = "item";
    for(let i = 0; i < 8; i++){
        let randomInt = Math.floor(Math.random() * 26);
        currentLetters[i] = letters[randomInt];
        document.getElementById((item + (i+1))).innerHTML = "<p>" + currentLetters[i].toUpperCase() + "</p>";
    }

}
*/

function assignLetters(){
    //Following the fact that vowels are super important for making words
    //we increase the likelihood of getting a vowel to around 40 percent.
    //so more words are possible.

    let conletters = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
    let vowelletters = ["a","e","i","o","u"];
    let item = "item";
    //choose vowel or consonant. We will do vowels at 40% and consonants at 60%
    for( let i = 0; i < 8; i++){
        let chooseLetterType = Math.floor(Math.random() * 100) + 1;
        if(chooseLetterType <= 40){
            let randomInt = Math.floor(Math.random() * 5);
            currentLetters[i] = vowelletters[randomInt];
            document.getElementById((item + (i+1))).innerHTML = "<p>" + currentLetters[i].toUpperCase() + "</p>";
        }else{
            let randomInt = Math.floor(Math.random() * 21);
            currentLetters[i] = conletters[randomInt];
            document.getElementById((item + (i+1))).innerHTML = "<p>" + currentLetters[i].toUpperCase() + "</p>";
        }
    }
}

//I was looking for ways to check if the user input is an actual word and assumed I would be dealing with huge big large arrays
//But then came across this api https://publicapi.dev/free-dictionary-api
//This saved my life.
//https://dev.to/trushmi/how-to-use-free-dictionary-api-gec is the site where it is shown how to use it.


async function isRealWord(word) {
    if (word.length < 2) return false; // Exclude single-letter words

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) return false; // If request fails (404, etc.), return false
    
    // the below two lines I got from Copilot.
    //
    const data = await response.json();
    return Array.isArray(data) && data[0]?.meanings?.length > 0;
}




let userInputLetters = [];
let pastUserInputs = [];
let score = 0;
let tries = 5;
let round;
//main game validation function.
//get Input, push each character into a dynamic array.
//make sure every character of the input is within the currentLetters array.
//once it is found, make sure to pop out that character in case of repeats.
async function check(){
    //this is to set to next round.
    if(tries == 1){
        restartAnimation();
        tries = 5;
        await updateTries(tries);
        return;
    }

    //decrement and upadate tries counter.
    updateTries(--tries);
    
    //reset userInputLetters array.
    userInputLetters.length = 0;

    //get input and make sure hasnt been guessed beofre.
    let USERINPUT = document.getElementById("wordInput").value;

    if(USERINPUT == ""){
        document.getElementById("returnValidation").style.color = "red";
        document.getElementById("returnValidation2").style.color = "red";

        document.getElementById("returnValidation").innerText = "Please enter a word!";
        document.getElementById("returnValidation2").innerText = "No score!";
        //tries++ // to offset the decrement at start of function
        return;
    }else if(pastUserInputs.includes(USERINPUT)){
        document.getElementById("returnValidation").style.color = "red";
        document.getElementById("returnValidation2").style.color = "red";

        document.getElementById("returnValidation").innerText = "Has already been guessed";
        document.getElementById("returnValidation2").innerText = "No score!"
        //tries++ 
        return;
    }else{
        pastUserInputs.push(USERINPUT);
    }

    //get each letter from userinput and push into an array for indexing.
    for(let i = 0; i < USERINPUT.length; i++){
        userInputLetters.push(USERINPUT.charAt(i));
    }

    //Now the reason we have spread operation here,
    //is because we need to only validate an amount of letters. 
    //If we didnt splice the letter from the letters array we check,
    //we could theoretically have 1 A given to us but use it like 3 times in banana
    //this method makes it that we can only use the letter we been given as many times we've been given it.
    let hasEachLetter = true;
    let tempLetters = [...currentLetters];  //spread operation, when checking my code found out this was a thing.
    for(let i = 0; i < userInputLetters.length; i++){
        if(!tempLetters.includes(userInputLetters[i])){
            hasEachLetter = false;
            break;
        }else{
            tempLetters.splice(tempLetters.indexOf(userInputLetters[i]));
            userInputLetters.splice(i);
        }
    }

    //here, once we validate input has each letter from given lettersm
    //we check is it a real word, and then proceedingly validate and update depending on variables.
    if(hasEachLetter){
        if(await isRealWord(USERINPUT)){
            document.getElementById("returnValidation").style.color = "green";
            document.getElementById("returnValidation2").style.color = "green";

            document.getElementById("returnValidation").innerText = "That is a word!";

            score += (USERINPUT.length * 50);
            updateScore(score);

            document.getElementById("returnValidation2").innerText = "+" + (USERINPUT.length * 50) + " score!"
        }else{
            document.getElementById("returnValidation").style.color = "red";
            document.getElementById("returnValidation2").style.color = "red";

            document.getElementById("returnValidation").innerText = "That is not a word!";
            document.getElementById("returnValidation2").innerText = "No score!"
        }
    }else{
        document.getElementById("returnValidation").style.color = "red";
        document.getElementById("returnValidation2").style.color = "red";

        document.getElementById("returnValidation").innerText = "Has an invalid letter";
        document.getElementById("returnValidation2").innerText = "No score!"
    }

}

function updateScore(score){
    document.getElementById("score").innerHTML = "-" + score + "-";
}

async function updateTries(tries){
    document.getElementById("tries").innerHTML = "-" + tries + "-";
}

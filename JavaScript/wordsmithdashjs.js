//This function reveals the letters initially after play is clicked

let round;
function revealLetters(){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
    round = 0;
    restartAnimation();
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

    document.getElementById("round").innerHTML = "-" + (++round) + "-";
}

let currentLetters = ["","","","","","","",""];

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

//I was looking for ways to check if the user input is an actual word and assumed I would be dealing with huge big large arrays
//But then came across this api https://publicapi.dev/free-dictionary-api
//This saved my life.
//https://dev.to/trushmi/how-to-use-free-dictionary-api-gec is the site where it is shown how to use it.


async function isRealWord(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok; // Returns true if the word exists
}

let userInputLetters = [];


//main game validation function.
//get Input, push each character into a dynamic array.
//make sure every character of the input is within the currentLetters array.
//once it is found, make sure to pop out that character in case of repeats.
function check(){
    alert(currentLetters);
    userInputLetters.length = 0;

    let USERINPUT = document.getElementById("wordInput").value;

    for(let i = 0; i < USERINPUT.length; i++){
        userInputLetters.push(USERINPUT.charAt(i));
    }

    let hasEachLetter = true;

    for(let i = 0; i < userInputLetters.length; i++){
        if(!currentLetters.includes(userInputLetters[i])){
            hasEachLetter = false;
            break;
        }
    }

    if(hasEachLetter){
        if(isRealWord(USERINPUT)){
            alert("THIS IS A REAL WORD!")
        }
    }else{
        alert("DOESN'T HAVE EACH LETTER");
    }


}
//this function is to compare the input to the letters given, which if each letter of the input is valid,
//then use isRealWord.



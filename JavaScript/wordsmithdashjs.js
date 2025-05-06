//This function reveals the letters initially after play is clicked
function revealLetters(){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
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
            item.style.animation = "fadeIn 1s forwards"; // Reapply animation
        }, 150);
    });
}

function assignLetters(){
    let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
    let item = "item";
    for(let i = 0; i < 8; i++){
        let randomInt = Math.floor(Math.random() * 26);
        document.getElementById((item + (i+1))).innerHTML = "<p>" + letters[randomInt] + "</p>";
    }

}

//I got AI to generate these arrays because they are just words.


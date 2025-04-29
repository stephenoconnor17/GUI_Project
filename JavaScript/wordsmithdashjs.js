function revealLetters(){
    document.getElementById("firstDiv").style.display = "none";
    document.getElementById("secondDiv").style.display = "block";
    restartAnimation();
}

function restartAnimation() {
    assignLetters();
    let items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.style.animation = "none"; // Remove animation
        item.style.opacity = "0"; // Ensure it fully disappears
        void item.offsetWidth; // Force browser reflow

        setTimeout(() => {
            item.style.animation = "fadeIn 1s forwards"; // Reapply animation
        }, 50); // Small delay to allow proper reset
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
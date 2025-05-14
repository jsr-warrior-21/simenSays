let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

const btns = ["yellow", "red", "purple", "green"];
const h2 = document.querySelector("h2");

 
document.addEventListener('keypress', () => {
    if (!started) {
        console.log("Game Started!");
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        levelUp();
    }
});

 
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
 
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

 
function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;

   
    let randInd = Math.floor(Math.random() * btns.length);
    let randColor = btns[randInd];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);  
    gameFlash(randBtn);
}

 
function checkAns() {
    let idx = userSeq.length - 1;

    if (userSeq[idx] !== gameSeq[idx]) {
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>. <br>Press any key to restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 500);
        reset();
        return;  t
    }

    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

 
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User Sequence:", userSeq);  
    checkAns();
}

 
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

 
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

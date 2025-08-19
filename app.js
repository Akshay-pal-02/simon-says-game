let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 👇 apna naam yaha set karo
let playerName = "Akshay";

// game start hone ke liye
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

// level up function
function levelUp() {
  userSeq = [];
  level++;
  // 👇 level ke sath naam dikhayega
  h2.innerText = `Level ${level} - ${playerName}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log("Game sequence:", gameSeq);

  btnFlash(randBtn);
}

// button flash function
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 1000);
}

// button click pe user ka input
function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// answer check karne ka function
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // 👇 Game over hote hi naam remove ho jayega
    h2.innerHTML = `Game Over! <br> <b>Your Score: ${level}</b> <br> Press Any Key To Restart`;
    reset();
  }
}

// game reset
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

// sabhi button pe click event listener
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// mobile button
// Existing keypress event
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// ✅ New button click event for mobile
$("#start-btn").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

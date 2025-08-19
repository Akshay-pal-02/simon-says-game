// Game variables
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start button
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

// Desktop ke liye keyboard start
document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

// Start / restart helper
function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  document.querySelector("h2").innerText = "Level " + level;

  // Author name hide
  const authorEl = document.getElementById("author");
  if (authorEl) authorEl.style.display = "none";

  nextSequence();
}

// User clicks
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    if (!started) return; // ignore clicks before start
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector("h2").innerText = "Level " + level;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
  playSound(randomChosenColor);
}

function flashButton(color) {
  const el = document.getElementById(color);
  el.classList.add("pressed");
  setTimeout(() => el.classList.remove("pressed"), 200);
}

// Check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 800);
    }
  } else {
    // Wrong
    playSound("wrong");
    document.body.style.backgroundColor = "#8B0000";
    setTimeout(() => (document.body.style.backgroundColor = "#011F3F"), 200);
    document.querySelector("h2").innerText = "Game Over! Press Start to Restart";
    startOver();
  }
}

// Play sound
function playSound(name) {
  // Simple tones from free resources; all acceptable for demo
  let urlMap = {
    red: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    blue: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
    green: "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
    yellow: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    wrong: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  };
  let audio = new Audio(urlMap[name] || urlMap.red);
  audio.play();
}

// Button animation
function animatePress(color) {
  let btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 100);
}

// Reset game
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];

  // Author name wapas show
  const authorEl = document.getElementById("author");
  if (authorEl) authorEl.style.display = "block";
}

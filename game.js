const gameContainer = document.getElementById("gameContainer");
const game_W = gameContainer.offsetWidth - 10;
const game_H = gameContainer.offsetHeight;

// bat move
const bat = document.getElementById("bat");
const batMoveSpeed = 5;
const bat_X = bat.offsetLeft;
const bat_W = bat.offsetWidth;

let isMovingLeft = false;
let isMovingRight = false;

const movebat = () => {
  if (isMovingRight && bat.offsetLeft < game_W - bat.offsetWidth) {
    bat.style.left = `${bat.offsetLeft + batMoveSpeed}px`;
  }
  if (isMovingLeft && bat.offsetLeft > 0) {
    bat.style.left = `${bat.offsetLeft - batMoveSpeed}px`;
  }
  requestAnimationFrame(movebat);
};

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    isMovingRight = true;
  }
  if (event.code === "ArrowLeft") {
    isMovingLeft = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    isMovingRight = false;
  }
  if (event.code === "ArrowLeft") {
    isMovingLeft = false;
  }
});

// Touch event handling for mobile
let touchStartX = 0;

gameContainer.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

gameContainer.addEventListener("touchmove", (event) => {
  const touchX = event.touches[0].clientX;
  const diffX = touchX - touchStartX;

  if (diffX > 0) {
    isMovingRight = true;
    isMovingLeft = false;
  } else if (diffX < 0) {
    isMovingLeft = true;
    isMovingRight = false;
  }
});

gameContainer.addEventListener("touchend", () => {
  isMovingRight = false;
  isMovingLeft = false;
});

movebat();

// tabs 

const tabsContainer = document.getElementById("tabsContainer");
const tabsCount = 25;
let tabsDie = 0;

for (let i = 0; i < tabsCount; i++) {
  let newTab = document.createElement("div");
  tabsContainer.appendChild(newTab);
}


// bal move
let startGame = false;

const ball = document.getElementById("ball");
const ball_S = ball.offsetWidth; // ball size (width = height)
const ballFrameSpeed = 15;
const ballSpeed = 3;
let ball_X = ballSpeed;
let ball_Y = ballSpeed;

let gameRunning = true; // Add a flag to control the game state

const gameLoop = setInterval(() => {
  if (!gameRunning) {
    clearInterval(gameLoop); // Stop the game loop if gameRunning is false
    window.location.reload();
    return;
  }
});

const ballMove = setInterval(() => {
  tabsContainer.childNodes.forEach((tab) => {
    let tX = tab.offsetLeft;
    let tY = tab.offsetTop;
    let tW = tab.offsetWidth;
    let tH = tab.offsetHeight;
    if (
      ball.offsetLeft + ball_S >= tX &&
      ball.offsetLeft <= tX + tW &&
      ball.offsetTop + ball_S >= tY &&
      ball.offsetTop <= tY + tH &&
      tab.className != "die"
    ) {
      ball_Y *= -1;
      tab.className = "die";
      tabsDie += 1;
    }
  });
  if (ball.offsetTop >= (gameContainer.offsetHeight - ball.offsetHeight * 1.5)) {
    gameRunning = false;
    alert("You lost! Try again.");
  }
  if (tabsDie === tabsCount) {
    gameRunning = false;
    alert("Congratulations! You win!");
  }
  ball.style.left = `${ball.offsetLeft + ball_X}px`;
  ball.style.top = `${ball.offsetTop + ball_Y}px`;
  if (ball.offsetLeft + ball_S >= game_W) {
    ball_X *= -1;
  } else if (ball.offsetLeft <= 0) {
    ball_X *= -1;
  } else if (ball.offsetTop + ball_S >= game_H) {
    ball_Y *= -1;
  } else if (
    ball.offsetLeft + ball_S > bat.offsetLeft &&
    ball.offsetLeft + ball_S < bat.offsetLeft + bat.offsetWidth &&
    ball.offsetTop >= bat.offsetTop - bat.offsetHeight
  ) {
    ball_Y *= -1;
  } else if (ball.offsetTop <= 0) {
    ball_Y *= -1;
  }
}, ballFrameSpeed);

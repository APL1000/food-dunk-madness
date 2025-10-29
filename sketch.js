let ball;
let hoop, hoop2, rim, rim2, backboard;
let isDragging = false;
let dragStart = null;
let score = 0;
let rounds = 1;
let setupTrue = true;
let currentScreen = "menu";
let menuButton,
  playButton,
  playButton2,
  saveButton,
  backButton,
  leaderboardButton;
let roundFinished = false;
let displayGameOver = false;

let scoredTrue = false;

let scored1 = false;
let scored2 = false;

let gameOver = false;

let savedInitials, savedLocation;

let initialsBox, locationBox;

let dataLoaded = false;

let gameCanvas;

let backgroundImg,
  backgroundImg2,
  boringSnack,
  disgustingFood,
  deliciousTreat,
  doorClosed,
  doorOpen,
  hoopImg,
  trophyImg,
  basketballImg;

let backgroundMusic, scoreSound, missSound;

let songStarted = false;

function preload() {
  backgroundImg = loadImage("Images/background.png");
  backgroundImg2 = loadImage("Images/background2.png");
  boringSnack = loadImage("Images/boring_Snack.png");
  disgustingFood = loadImage("Images/disgusting_Food.png");
  deliciousTreat = loadImage("Images/delicious_Treat.png");
  doorClosed = loadImage("Images/closed_Door.png");
  doorOpen = loadImage("Images/empty_Door.png");
  hoopImg = loadImage("Images/hoop.png");
  trophyImg = loadImage("Images/trophy.png");
  basketballImg = loadImage("Images/basketball.png");
  backgroundMusic = loadSound("Images/backgroundMusic.mp3");
  scoreSound = loadSound("Images/crowd_cheer.mp3");
}

function setup() {
  // create canvas and attach it to the container
  gameCanvas = createCanvas(800, 400);
  gameCanvas.parent("canvas-container");

  // make sure canvas z-index is lower than Webix
  gameCanvas.elt.style.zIndex = "0";
  gameCanvas.elt.style.position = "relative";

  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", (e) => e.preventDefault(), {
    passive: false,
  });

  gui = createGui(gameCanvas);
  // Ball starting position (left side)
  ball = {
    x: 100,
    y: height - 50,
    r: 15,
    vx: 0,
    vy: 0,
    isMoving: false,
  };

  // Hoop position (left side)
  hoop = {
    x: width - 200,
    y: height - 130,
    w: 120,
    h: 10,
  };

  // Hoop position (right side)
  hoop2 = {
    x: width - 220,
    y: height - 50,
    w: 180,
    h: 10,
  };

  // Hoop setup
  rim = {
    x: width - 200,
    y: height - 130,
    w: 15,
    h: 15,
  };

  // Hoop setup
  rim2 = {
    x: width - 80,
    y: height - 130,
    w: 40,
    h: 15,
  };

  backboard = {
    x: width - 50,
    y: rim.y - 80,
    w: 10,
    h: 120,
  };

  playButton = createButton("Play", width / 2 - 75, height / 2 - 40, 150, 75);
  playButton.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  playButton2 = createButton("Play", width / 2 - 50, height / 2 + 40, 150, 75);
  playButton2.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  backButton = createButton(
    "Back To Menu",
    width / 2 - 100,
    height / 2,
    225,
    75
  );
  backButton.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  saveButton = createButton(
    "Save Score",
    width / 2 - 100,
    height / 2 + 100,
    225,
    75
  );
  saveButton.setStyle({
    textSize: 30,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  initialsInput = createInput();
  initialsInput.attribute("maxlength", 30);
  initialsInput.attribute("placeholder", "Enter Initials");
  initialsInput.size(100, 25);
  initialsInput.input(saveInput);

  locationSelect = createInput();
  locationSelect.attribute("maxlength", 30);
  locationSelect.attribute("placeholder", "Enter Location");
  locationSelect.size(150, 25);
  locationSelect.input(saveInput);

  // Create GUI buttons next to where the inputs are
  initialsBox = createButton("Focus", width / 2 + 150, height / 2 - 30, 50, 50);
  initialsBox.setStyle({
    textSize: 10,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });
  locationBox = createButton("Focus", width / 2 + 150, height / 2 + 30, 50, 50);

  locationBox.setStyle({
    textSize: 10,
    fillBg: color("orange"),
    fillBgHover: color("yellow"),
    fillLabel: color(0),
    rounding: 12,
    strokeBg: color(0),
  });

  leaderboardButton = new Clickable();
  leaderboardButton.resize(75, 75);
  leaderboardButton.image = trophyImg;
  leaderboardButton.text = "Leaderboard";
  leaderboardButton.textColor = "white";
  leaderboardButton.locate(0, 0);

  positionInputs(); // fix input alignment

  // Make sure the canvas stays below
  gameCanvas.elt.style.position = "relative";
  gameCanvas.elt.style.zIndex = "0";
}

function positionInputs() {
  let rect = gameCanvas.elt.getBoundingClientRect();

  initialsInput.position(
    rect.left + width / 2 - 50,
    rect.top + height / 2 - 20
  );
  locationSelect.position(
    rect.left + width / 2 - 50,
    rect.top + height / 2 + 20
  );
}

function draw() {
  background(200, 220, 255);

  drawMenu();
  playScreen();
  chooseScreen();
  selectScreen();
  leaderboardScreen();
  instructionScreen();
}

function mousePressed() {
  if (songStarted == false) {
    backgroundMusic.loop();
    songStarted = true;
  }
  // Start dragging if ball is not moving
  if (currentScreen == "play" && rounds < 13 && scoredTrue == false) {
    if (!ball.isMoving) {
      isDragging = true;
      dragStart = createVector(mouseX, mouseY);
    }
  } else if (currentScreen == "choose" && !resetting) {
    for (let i = 0; i < doors.length; i++) {
      let d = doors[i];
      if (
        mouseX > d.x - d.w / 2 &&
        mouseX < d.x + d.w / 2 &&
        mouseY > d.y - d.h / 2 &&
        mouseY < d.y + d.h / 2
      ) {
        // Toggle door active state
        d.active = !d.active;
        console.log(`Door ${i + 1} clicked!`);

        let doorNum = i + 1;
        handleDoorClick(d); // Call once per door

        // Example: change screen after clicking door 1
        if (doorNum === 1 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
        if (doorNum === 2 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
        if (doorNum === 3 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
      }
    }
  }
}

function mouseReleased() {
  if (isDragging && dragStart) {
    // Drag vector = difference from drag start to release
    let dragEnd = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(dragStart, dragEnd);

    // Apply horizontal slingshot power
    ball.vx = force.x * 0.17; // horizontal
    ball.vy = force.y * 0.17; // vertical
    ball.isMoving = true;
  }

  // Reset drag
  isDragging = false;
  dragStart = null;
}

function touchStarted() {
  if (songStarted == false) {
    backgroundMusic.loop();
    songStarted = true;
  }

  // Start dragging if ball is not moving
  if (currentScreen == "play" && rounds < 13 && scoredTrue == false) {
    if (!ball.isMoving) {
      isDragging = true;
      dragStart = createVector(mouseX, mouseY);
    }
  } else if (currentScreen == "choose" && !resetting) {
    for (let i = 0; i < doors.length; i++) {
      let d = doors[i];
      if (
        mouseX > d.x - d.w / 2 &&
        mouseX < d.x + d.w / 2 &&
        mouseY > d.y - d.h / 2 &&
        mouseY < d.y + d.h / 2
      ) {
        // Toggle door active state
        d.active = !d.active;
        console.log(`Door ${i + 1} clicked!`);

        let doorNum = i + 1;
        handleDoorClick(d); // Call once per door

        // Example: change screen after clicking door 1
        if (doorNum === 1 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
        if (doorNum === 2 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
        if (doorNum === 3 && !changeScreen) {
          changeScreen = true;
          setTimeout(() => {
            currentScreen = "play";
            changeScreen = false;
            scoredTrue = false;
          }, 2000);
        }
      }
    }
  } else if (currentScreen == "select") {
    if (initialsBox.isPressed) {
      initialsInput.elt.focus(); // manually focus it
    }

    if (locationBox.isPressed) {
      locationSelect.elt.focus();
    }
  }
}

function keyPressed() {
  if (
    currentScreen === "instructions" &&
    (keyCode === 32 || keyCode === ENTER)
  ) {
    currentScreen = "play";
    setupTrue = true;
  }
}

function touchEnded() {
  if (isDragging && dragStart) {
    // Drag vector = difference from drag start to release
    let dragEnd = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(dragStart, dragEnd);

    // Apply horizontal slingshot power
    ball.vx = force.x * 0.15; // horizontal
    ball.vy = force.y * 0.15; // vertical
    ball.isMoving = true;
  }

  // Reset drag
  isDragging = false;
  dragStart = null;
}

function resetBall() {
  ball.x = 100;
  ball.y = height - 50;
  ball.vx = 0;
  ball.vy = 0;
  ball.isMoving = false;
  scored1 = false;
  scored2 = false;
  roundFinished = true;
}

//Save initials and location
function saveInput(initials, location) {
  localStorage.setItem("basketballplayerInitials", initials);
  localStorage.setItem("basketballplayerLocation", location);
}

// --- Door data ---
let doors = [
  { x: 175, y: 225, w: 150, h: 250, color: "#ffa64d", active: false },
  { x: 400, y: 225, w: 150, h: 250, color: "#ffdc73", active: false },
  { x: 625, y: 225, w: 150, h: 250, color: "#ff7f50", active: false },
];

// Save the original x positions (layout)
let originalPositions = [175, 400, 625];

let doorResults = ["Treat", "Boring Snack", "Disgusting Food"];
let resultText = "";
let resetting = false;
let changeScreen = false;

let currentRewardImage = null;

//Create function to make buttons
function createPlayButton(button) {
  if (button == 0) {
    playButton.visible = true;
    playButton.enabled = true;
    if (!playButton) {
      // create a "Play" button
      playButton = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 60,
        150,
        75
      );
      playButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }

  if (button == 1) {
    playButton2 = createButton(
      "Play",
      width / 2 - 60,
      height / 2 + 60,
      150,
      75
    );
    playButton2.setStyle({
      textSize: 30,
      fillBg: color("orange"),
      fillBgHover: color("yellow"),
      fillLabel: color(0),
      rounding: 12,
      strokeBg: color(0),
    });
  }
  if (button == 2) {
    backButton.visible = true;
    backButton.enabled = true;
    if (!backButton) {
      // create a "Play" button
      backButton = createButton(
        "Back To Menu",
        width / 2 - 75,
        height / 2 + 40,
        150,
        50
      );
      backButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }
  if (button == 3) {
    // create a "Play" button
    leaderboardButton = createButton(
      "Leaderboard",
      width / 2 - 50,
      height / 2 - 25,
      100,
      50
    );
    leaderboardButton.setStyle({
      fillBg: color("orange"),
      fillBgHover: color("yellow"),
      fillLabel: color(0),
      rounding: 12,
      strokeBg: color(0),
    });
  }
  try {
    if (button == 4) {
      saveButton.visible = true;
      saveButton.enabled = true;
      if (!saveButton) {
        // create a "Play" button
        saveButton = createButton(
          "Save Score",
          width / 2 - 75,
          height / 2 + 100,
          150,
          50
        );
        saveButton.setStyle({
          textSize: 30,
          fillBg: color("orange"),
          fillBgHover: color("yellow"),
          fillLabel: color(0),
          rounding: 12,
          strokeBg: color(0),
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  if (button == 5) {
    initialsBox.visible = true;
    initialsBox.enabled = true;
    if (!initialsBox) {
      // create a "Play" button
      initialsBox = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 60,
        150,
        75
      );
      initialsBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }

  if (button == 6) {
    locationBox.visible = true;
    locationBox.enabled = true;
    if (!locationBox) {
      // create a "Play" button
      locationBox = createButton(
        "Play",
        width / 2 - 50,
        height / 2 - 60,
        150,
        75
      );
      locationBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
  }
}

function chooseScreen() {
  if (currentScreen == "choose") {
    push();
    background(200, 220, 255);

    image(backgroundImg2, 0, 0, width, height);

    textAlign(CENTER, TOP);
    textSize(32);
    fill("black");
    text("Choose a Door", width / 2, 60);

    rectMode(CENTER);

    for (let i = 0; i < doors.length; i++) {
      let d = doors[i];
      stroke(255);
      strokeWeight(3);
      fill(d.active ? "#00cc66" : d.color);
      rect(d.x, d.y, d.w, d.h, 12);

      push();
      imageMode(CENTER);
      image(doorClosed, d.x, d.y, d.w + 50, d.h);

      if (d.active == true) {
        image(doorOpen, d.x, d.y, d.w + 50, d.h);
        image(currentRewardImage, d.x, d.y, 75, 75);
      }

      pop();
    }

    // Result text + score
    textAlign(CENTER);
    textSize(24);
    fill("black");
    text(resultText, width / 2, height - 120);
    text(`Score: ${score}`, width / 2, height - 80);

    pop();
  }
}

function handleDoorClick(door) {
  resetting = true;

  // Random result
  let randomResult = random(doorResults);

  if (randomResult === "Treat") {
    score += 5;
    currentRewardImage = deliciousTreat;
  } else if (randomResult === "Disgusting Food") {
    score -= 2;
    currentRewardImage = disgustingFood;
  } else if (randomResult === "Boring Snack") {
    currentRewardImage = boringSnack;
  }

  resultText = `You got a ${randomResult}!`;
  door.active = true;

  // Flash random color
  door.color = color(random(255), random(255), random(255));

  // Reset others
  for (let d of doors) {
    if (d !== door) d.active = false;
  }

  // Reset everything after 2 seconds
  setTimeout(resetDoors, 2000);
}

function resetDoors() {
  // Shuffle the positions
  let shuffled = shuffle([...originalPositions]);

  // Assign each door a new x position
  for (let i = 0; i < doors.length; i++) {
    doors[i].x = shuffled[i];
    doors[i].active = false;
  }

  resultText = "";
  resetting = false;
}

function playScreen() {
  if (currentScreen == "play") {
    if (setupTrue == true) {
      rounds = 1;
      setupTrue = false;
      score = 0;
    } else {
      image(backgroundImg, 0, 0, width, height);
      image(hoopImg, width - 240, height - 240, 240, 240);
      fill("yellow");
      rect(0, 0, 300, 50);

      image(basketballImg, ball.x - 25, ball.y - 25, 50, 50);

      // Display score
      fill(0);
      textSize(24);
      text("Score: " + score, 70, 30);

      if (
        ball.x + ball.r > backboard.x &&
        ball.y > backboard.y &&
        ball.y < backboard.y + backboard.h
      ) {
        ball.vx *= -0.4;
        ball.vy *= -0.4;
        ball.x = backboard.x - ball.r;
      }

      // Check collision left rim
      if (
        ball.x + ball.r > rim.x &&
        ball.x - ball.r < rim.x + rim.w &&
        ball.y + ball.r > rim.y &&
        ball.y - ball.r < rim.y + rim.h
      ) {
        // Determine collision side
        let overlapXRight = rim.x + rim.w - (ball.x - ball.r);
        let overlapXLeft = ball.x + ball.r - rim.x;
        let overlapYBottom = rim.y + rim.h - (ball.y - ball.r);
        let overlapYTop = ball.y + ball.r - rim.y;

        let minOverlap = Math.min(
          overlapXRight,
          overlapXLeft,
          overlapYBottom,
          overlapYTop
        );

        if (minOverlap === overlapXLeft) {
          // Hit left side
          ball.vx = -abs(ball.vx) * 0.4;
          ball.x = rim.x - ball.r;
        } else if (minOverlap === overlapXRight) {
          // Hit right side
          ball.vx = abs(ball.vx) * 0.4;
          ball.x = rim.x + rim.w + ball.r;
        } else if (minOverlap === overlapYTop) {
          // Hit top
          ball.vy = -abs(ball.vy) * 0.4;
          ball.y = rim.y - ball.r;
        } else if (minOverlap === overlapYBottom) {
          // Hit bottom
          ball.vy = abs(ball.vy) * 0.4;
          ball.y = rim.y + rim.h + ball.r;
        }
      }

      // --- Right Rim (rim2) ---
      if (
        ball.x + ball.r > rim2.x &&
        ball.x - ball.r < rim2.x + rim2.w &&
        ball.y + ball.r > rim2.y &&
        ball.y - ball.r < rim2.y + rim2.h
      ) {
        let overlapXRight = rim2.x + rim2.w - (ball.x - ball.r);
        let overlapXLeft = ball.x + ball.r - rim2.x;
        let overlapYBottom = rim2.y + rim2.h - (ball.y - ball.r);
        let overlapYTop = ball.y + ball.r - rim2.y;

        let minOverlap = Math.min(
          overlapXRight,
          overlapXLeft,
          overlapYBottom,
          overlapYTop
        );

        if (minOverlap === overlapXLeft) {
          ball.vx = -abs(ball.vx) * 0.4;
          ball.x = rim2.x - ball.r;
        } else if (minOverlap === overlapXRight) {
          ball.vx = abs(ball.vx) * 0.4;
          ball.x = rim2.x + rim2.w + ball.r;
        } else if (minOverlap === overlapYTop) {
          ball.vy = -abs(ball.vy) * 0.4;
          ball.y = rim2.y - ball.r;
        } else if (minOverlap === overlapYBottom) {
          ball.vy = abs(ball.vy) * 0.4;
          ball.y = rim2.y + rim2.h + ball.r;
        }
      }

      if (rounds < 13) {
        //Display Rounds
        fill(0);
        textSize(24);
        text("Round: " + rounds, 200, 30);

        // Draw drag line if dragging
        if (isDragging && dragStart && scoredTrue == false) {
          let dx = mouseX - ball.x;
          let dy = mouseY - ball.y;
          let magnitude = sqrt(dx * dx + dy * dy);

          if (magnitude > 0) {
            let ux = dx / magnitude;
            let uy = dy / magnitude;
            let lineLength = ball.x - mouseX; // how far the guide goes

            if (lineLength > 160) {
              lineLength = 160;
            }
            let dotSpacing = 20; // distance between each circle

            // forward aiming guide
            line(ball.x, ball.y, mouseX, mouseY);

            // Forwards Aim
            line(
              ball.x,
              ball.y,
              ball.x - ux * lineLength,
              ball.y - uy * lineLength
            );

            // Draw multiple small circles along the guide
            for (let i = dotSpacing; i < lineLength; i += dotSpacing) {
              let x = ball.x + ux * -i;
              let y = ball.y + uy * -i;

              // Optional: make circles fade as they go further
              let alpha = map(i, 0, lineLength, 255, 0);
              fill(255, 0, 0, alpha);

              let size = map(i, 0, lineLength, 20, 4);
              ellipse(x, y, size); // circle size
            }
          }
        }

        // Update ball movement
        if (ball.isMoving) {
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.vy += 0.4; // gravity

          // Check scoring (ball intersects hoop)
          if (
            ball.y - ball.r < hoop.y + hoop.h &&
            ball.y + ball.r > hoop.y &&
            ball.x > hoop.x &&
            ball.x < hoop.x + hoop.w &&
            ball.vy > 0
          ) {
            scored1 = true;
          }

          // Check scoring (ball intersects hoop)
          if (
            ball.y - ball.r < hoop2.y + hoop2.h &&
            ball.y + ball.r > hoop2.y &&
            ball.x > hoop2.x &&
            ball.x < hoop2.x + hoop2.w &&
            ball.vy > 0
          ) {
            scored2 = true;
          }

          if (scored1 == true && scored2 == true) {
            scoreSound.play();
            score += 2;

            scored1 = false;
            scored2 = false;
            scoredTrue = true;

            setTimeout(() => {
              currentScreen = "choose";
            }, 500);
          }

          // Reset if ball off screen
          if (ball.y > height + ball.r || ball.x > width + 50) {
            resetBall();
          }
        }
      } else {
        //Display Rounds
        fill(0);
        textSize(24);
        text("Round: " + 12, 200, 30);

        if (displayGameOver == true) {
          fill("yellow");
          rect(100, 50, 600, 100);

          fill("red");
          textSize(96);
          textAlign(CENTER, CENTER);
          text("Game Over!", width / 2, height / 4);
        }

        if (gameOver == false) {
          gameOver = true;
          setTimeout(() => {
            createPlayButton(2);
            createPlayButton(4);
            displayGameOver = true;
          }, 1000);
        }

        //Check if buttons are pressed
        if (currentScreen == "play" && backButton.isPressed) {
          backButton.visible = false;
          backButton.enabled = false;
          saveButton.visible = false;
          saveButton.enabled = false;
          currentScreen = "menu";
          rounds = 1;
          createPlayButton(0);
          gameOver = false;
          displayGameOver = false;
        }
        drawGui();
        if (currentScreen == "play" && saveButton.isPressed) {
          gameOver = false;
          saveButton.visible = false;
          saveButton.enabled = false;
          generateDailyLeaderboard();
          updateLeaderboard(
            localStorage.getItem("basketballplayerInitials"),
            localStorage.getItem("basketballplayerLocation"),
            score
          );
          currentScreen = "leaderboard";
          rounds = 1;
          displayGameOver = false;
        }
      }
    }
    if (roundFinished == true && currentScreen == "play") {
      rounds += 1;
      roundFinished = false;
    }
  }
}

function bounceOffBlock(ball, block) {
  // Track whether the ball is currently inside the block
  if (!ball.lastBounce) ball.lastBounce = false;

  let closestX = constrain(ball.x, block.x, block.x + block.w);
  let closestY = constrain(ball.y, block.y, block.y + block.h);

  let dx = ball.x - closestX;
  let dy = ball.y - closestY;
  let distance = sqrt(dx * dx + dy * dy);

  // Check if inside collision radius
  if (distance < ball.r) {
    if (!ball.lastBounce) {
      // Only bounce once per entry
      let overlap = ball.r - distance;
      let nx = dx / distance;
      let ny = dy / distance;
      ball.x += nx * overlap;
      ball.y += ny * overlap;

      // Reflect velocity
      let dot = ball.vx * nx + ball.vy * ny;
      ball.vx -= 2 * dot * nx;
      ball.vy -= 2 * dot * ny;

      // Add damping
      ball.vx *= 0.8;
      ball.vy *= 0.8;

      // Mark that we've already bounced
      ball.lastBounce = true;
    }
  } else {
    // Reset bounce flag when the ball leaves
    ball.lastBounce = false;
  }
}

//Create menus with buttons
function drawMenu() {
  if (currentScreen == "menu") {
    image(backgroundImg2, 0, 0, width, height);
    initialsInput.hide();
    locationSelect.hide();

    //In case any errors happen
    try {
      backButton.visible = false;
      backButton.enabled = false;
      saveButton.visible = false;
      saveButton.enabled = false;
    } catch (err) {}
    try {
      playButton2.visible = false;
      playButton2.enabled = false;
    } catch {}
    //In case any errors happen
    try {
      initialsBox.visible = false;
      initialsBox.enabled = false;
      locationBox.visible = false;
      locationBox.enabled = false;
    } catch (err) {}

    //Style the menu
    fill("black");
    rect(75, 50, 650, 100);

    stroke("black");
    strokeWeight(3);
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Food Dunk Madness", width / 2, 120);
    leaderboardButton.draw();
    drawGui();
  }

  //Check if buttons are pressed
  if (currentScreen === "menu" && playButton.isPressed) {
    currentScreen = "select";
    strokeWeight(1);
    playButton.visible = false;
    playButton.enabled = false;
    createPlayButton(1);
  }

  leaderboardButton.onPress = function () {
    currentScreen = "leaderboard";
    createPlayButton(2);
  };
}

//Create a screen where the player can enter data
function selectScreen() {
  if (currentScreen == "select") {
    image(backgroundImg, 0, 0, width, height);
    if (dataLoaded == false) {
      positionInputs();

      // load only once
      const savedInitials = localStorage.getItem("basketballplayerInitials");
      const savedLocation = localStorage.getItem("basketballplayerLocation");

      if (savedInitials) initialsInput.value(savedInitials);
      if (savedLocation) locationSelect.value(savedLocation);

      dataLoaded = true; // mark as loaded

      createPlayButton(5);
      createPlayButton(6);
    }

    //Declare input values
    var initials = initialsInput.value().trim();
    var location = locationSelect.value();

    stroke("black");
    strokeWeight(3);
    fill("red");
    rect(150, 0, 500, 200);

    fill("yellow");
    text(" Enter your initials \n and location", width / 2, height / 2 - 100);

    //Show the input boxes
    initialsInput.show();
    locationSelect.show();
    drawGui();

    //Play game when pressed
    if (playButton2.isPressed) {
      if (initials.length >= 3 && location != "") {
        localStorage.setItem("basketballplayerInitials", initials);
        localStorage.setItem("basketballplayerLocation", location);

        instructionTimer = millis();
        currentScreen = "instructions";

        strokeWeight(1);
        initialsInput.hide();
        locationSelect.hide();
        playButton2.visible = false;

        //In case any errors happen
        try {
          initialsBox.visible = false;
          initialsBox.enabled = false;
          locationBox.visible = false;
          locationBox.enabled = false;
        } catch (err) {}

        dataLoaded = false; // reset for next time
      } else {
        alert("Please enter 3 initials and select a location!");
      }
    }

    if (initialsBox.isPressed) {
      initialsInput.elt.focus(); // manually focus it
    }

    if (locationBox.isPressed) {
      locationSelect.elt.focus();
    }
  }
}

let leaderboard = [];
let lastGeneratedDate = "";

function updateLeaderboard(initials, location, score) {
  // Load the current leaderboard from localStorage
  let storedLeaderboard =
    JSON.parse(localStorage.getItem("basketballleaderboard")) || [];
  leaderboard = storedLeaderboard; // use existing leaderboard

  // Check if player already exists
  let player = leaderboard.find((entry) => entry.initials === initials);

  if (player) {
    // Update score if higher
    if (score > player.score) {
      player.score = score;
      player.location = location;
    }
  } else {
    // Add new player
    leaderboard.push({ initials, location, score });
  }

  // Sort from highest to lowest score
  leaderboard.sort((a, b) => b.score - a.score);

  // Keep only top 10 entries
  if (leaderboard.length > 10) {
    leaderboard = leaderboard.slice(0, 10);
  }

  // Save updated leaderboard back to localStorage
  localStorage.setItem("basketballleaderboard", JSON.stringify(leaderboard));
}

function generateDailyLeaderboard() {
  // Get today's date in YYYY-MM-DD format
  let today = new Date().toISOString().split("T")[0];

  // Check if we already generated today's leaderboard
  if (localStorage.getItem("basketballleaderboardDate") === today) {
    leaderboard = JSON.parse(localStorage.getItem("basketballleaderboard"));
    return;
  }
  else{
    localStorage.removeItem("basketballleaderboard");
    localStorage.removeItem("basketballleaderboardDate");
  }

  // Otherwise, make a new random leaderboard
  const sampleInitials = [
    "AM",
    "JS",
    "KT",
    "LM",
    "RB",
    "TD",
    "CG",
    "MP",
    "ZN",
    "QF",
  ];
  const sampleLocations = [
    "Canada",
    "USA",
    "Japan",
    "UK",
    "France",
    "Germany",
    "Italy",
    "Brazil",
    "India",
    "Australia",
  ];

  leaderboard = [];
  for (let i = 0; i < 10; i++) {
    let initials =
      sampleInitials[Math.floor(Math.random() * sampleInitials.length)];
    let location =
      sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    let score = Math.floor(Math.random() * 33 + 5); // random score 100–1100

    leaderboard.push({ initials, location, score });
  }

  // Sort leaderboard (highest score first)
  leaderboard.sort((a, b) => b.score - a.score);

  // Save to localStorage with today's date
  localStorage.setItem("basketballleaderboard", JSON.stringify(leaderboard));
  localStorage.setItem("basketballleaderboardDate", today);
}

function leaderboardScreen() {
  if (currentScreen == "leaderboard") {
    image(backgroundImg2, 0, 0, width, height);
    // Ensure leaderboard is ready
    generateDailyLeaderboard();

    stroke("black");
    strokeWeight(4);
    fill("white");

    initialsInput.hide();
    locationSelect.hide();

    // Disable buttons
    saveButton.visible = false;
    saveButton.enabled = false;

    playButton.visible = false;
    playButton2.visible = false;

    push();
    // --- BACKGROUND SQUARES ---
    noStroke();
    fill(0, 0, 0, 180); // dark transparent squares
    let boxWidth = 320;
    let boxHeight = 400;
    rect(width / 2 - boxWidth - 50, 60, boxWidth - 50, boxHeight, 20); // left box
    rect(width / 2 + 110, 60, boxWidth - 50, boxHeight, 20); // right box
    pop();

    drawGui();

    fill("yellow");
    textAlign(CENTER);
    textSize(20);
    text("🏆 Daily Leaderboard 🏆", width / 2, 40);
    textSize(22);

    fill("white");
    // Split into two columns
    const leftX = width / 5; // left column x position
    const rightX = (width / 5) * 4; // right column x position
    const startY = 100; // top margin
    const lineSpacing = 60; // vertical spacing

    // Draw leaderboard
    for (let i = 0; i < leaderboard.length; i++) {
      let entry = leaderboard[i];
      let columnX, rowY;

      // First 5 entries on the left, rest on the right
      if (i < 5) {
        columnX = leftX;
        rowY = startY + i * lineSpacing;
      } else {
        columnX = rightX;
        rowY = startY + (i - 5) * lineSpacing;
      }

      text(
        `${i + 1}. ${entry.initials} - ${entry.location}\nScore: ${
          entry.score
        }`,
        columnX,
        rowY
      );
    }

    // Back button
    if (currentScreen == "leaderboard" && backButton.isPressed) {
      currentScreen = "menu";
      createPlayButton(0);
    }
  }
}

// Add a new screen variable
let instructionTimer = 0;
let showInstructions = true;

function instructionScreen() {
  if (currentScreen === "instructions") {
    image(backgroundImg2, 0, 0, width, height);

    push();
    // Title
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Trebuchet MS");
    textStyle(BOLD);
    textSize(64);
    text("🏀 How to Play 🏀", width / 2, 50);

    // Pop-out background box
    noStroke();
    fill(0, 0, 0, 150); // Semi-transparent black background
    rectMode(CENTER);
    rect(width / 2, height / 2, width * 0.8, height * 0.6, 20);

    // Instruction text
    fill(255);
    textSize(22);
    textAlign(CENTER, TOP);
    text(
      "• Drag the ball and release, like a slingshot!\n" +
        "• Aim for the hoop — timing and angle matter.\n" +
        "• After each round, pick a door for a surprise reward.\n" +
        "• Avoid boring snacks, aim for treats!\n" +
        "• -2 for disgusting foods, 0 for boring snacks, \n" +
        "and 5 points for treats.\n\n" +
        "Press SPACE or ENTER to skip.",
      width / 2,
      height / 2 - 100
    );

    pop();

    // 10-second countdown
    let remaining = max(0, 10 - floor((millis() - instructionTimer) / 1000));
    textSize(18);
    fill("yellow");
    text(`Starting in ${remaining} seconds...`, width / 2, height - 60);

    // Auto transition after 10 seconds
    if (millis() - instructionTimer > 10000) {
      currentScreen = "play";
      setupTrue = true;
    }
  }
}

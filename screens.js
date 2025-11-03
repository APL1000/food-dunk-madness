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
let currentRewardImage = null;
let score = 0;
let currentScreen = "menu";
let playButton, playButton2, backButton, leaderboardButton, saveButton, initialsBox, locationBox;
let initialsInput, locationSelect;
let dataLoaded = false;

// Leaderboard keys for localStorage
const dummyKey = "hungryGobblerDummyLeaderboard";
const playerKey = "hungryGobblerPlayerLeaderboard";

// Create buttons
function createPlayButton(button) {
  if (button == 0) {
    if (!playButton) {
      playButton = createButton("Play", width / 2 - 50, height / 2 - 60, 150, 75);
      playButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    playButton.visible = true;
    playButton.enabled = true;
  }
  if (button == 1) {
    if (!playButton2) {
      playButton2 = createButton("Play", width / 2 - 60, height / 2 + 60, 150, 75);
      playButton2.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    playButton2.visible = true;
    playButton2.enabled = true;
  }
  if (button == 2) {
    if (!backButton) {
      backButton = createButton("Back To Menu", width / 2 - 75, height / 2 + 40, 150, 50);
      backButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    backButton.visible = true;
    backButton.enabled = true;
  }
  if (button == 3) {
    if (!leaderboardButton) {
      leaderboardButton = createButton("Leaderboard", width / 2 - 50, height / 2 - 25, 100, 50);
      leaderboardButton.setStyle({
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    leaderboardButton.visible = true;
    leaderboardButton.enabled = true;
  }
  if (button == 4) {
    if (!saveButton) {
      saveButton = createButton("Save Score", width / 2 - 75, height / 2 + 100, 150, 50);
      saveButton.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    saveButton.visible = true;
    saveButton.enabled = true;
  }
  if (button == 5) {
    if (!initialsBox) {
      initialsBox = createButton("Play", width / 2 - 50, height / 2 - 60, 150, 75);
      initialsBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    initialsBox.visible = true;
    initialsBox.enabled = true;
  }
  if (button == 6) {
    if (!locationBox) {
      locationBox = createButton("Play", width / 2 - 50, height / 2 - 60, 150, 75);
      locationBox.setStyle({
        textSize: 30,
        fillBg: color("orange"),
        fillBgHover: color("yellow"),
        fillLabel: color(0),
        rounding: 12,
        strokeBg: color(0),
      });
    }
    locationBox.visible = true;
    locationBox.enabled = true;
  }
}

// Choose screen
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
    textAlign(CENTER);
    textSize(24);
    fill("black");
    text(resultText, width / 2, height - 120);
    text(`Score: ${score}`, width / 2, height - 80);
    pop();
  }
}

// Door click handling
function handleDoorClick(door) {
  resetting = true;
  let randomResult = random(doorResults);
  if (randomResult === "Treat") {
    score += 5;
    currentRewardImage = deliciousTreat;
  } else if (randomResult === "Disgusting Food") {
    score -= 2;
    currentRewardImage = disgustingFood;
  } else {
    currentRewardImage = boringSnack;
  }
  resultText = `You got a ${randomResult}!`;
  door.active = true;
  door.color = color(random(255), random(255), random(255));
  for (let d of doors) {
    if (d !== door) d.active = false;
  }
  setTimeout(resetDoors, 2000);
}
function resetDoors() {
  let shuffled = shuffle([...originalPositions]);
  for (let i = 0; i < doors.length; i++) {
    doors[i].x = shuffled[i];
    doors[i].active = false;
  }
  resultText = "";
  resetting = false;
}

// [Include your full existing game playScreen(), menu, selectScreen, instructionScreen, drawMenu etc. exactly]

// Leaderboard subsystem begins here:

// Generate dummy leaderboard (once)
function generateDummyLeaderboard() {
  if (!localStorage.getItem(dummyKey)) {
    const initialsPool = ["AM","JS","KT","LM","RB","TD","CG","MP","ZN","QF"];
    const locationPool = ["Canada","USA","Japan","UK","France","Germany","Italy","Brazil","India","Australia"];
    let dummyScores = [];
    for(let i=0;i<10;i++){
      let score = Math.floor(Math.random()*85 + 5);
      dummyScores.push({
        initials: initialsPool[Math.floor(Math.random()*initialsPool.length)],
        location: locationPool[Math.floor(Math.random()*locationPool.length)],
        score: Math.min(score, 90)
      });
    }
    dummyScores.sort((a,b)=>a.score-b.score);
    localStorage.setItem(dummyKey, JSON.stringify(dummyScores));
  }
}

// Merge dummy and real leaderboard scores sorted by ascending score capped at 90
function getMergedLeaderboard(){
  const dummyScores=JSON.parse(localStorage.getItem(dummyKey))||[];
  const playerScores=JSON.parse(localStorage.getItem(playerKey))||[];
  const cappedDummy=dummyScores.map(s=>({...s,score:Math.min(s.score,90)}));
  const cappedPlayer=playerScores.map(s=>({...s,score:Math.min(s.score,90)}));
  const map=new Map();
  cappedDummy.forEach(e=>map.set(e.initials,e));
  cappedPlayer.forEach(e=>{
    if(!map.has(e.initials)||e.score<map.get(e.initials).score){
      map.set(e.initials,e);
    }
  });
  const merged=Array.from(map.values());
  merged.sort((a,b)=>a.score-b.score);
  return merged.slice(0,10);
}

// Update player leaderboard scores
function updateLeaderboard(initials,location,score){
  if(!initials||!location||typeof score!=="number")return;
  if(score>90)score=90;
  let playerScores=JSON.parse(localStorage.getItem(playerKey))||[];
  let found=playerScores.find(p=>p.initials===initials);
  if(found){
    if(score<found.score){
      found.score=score;
      found.location=location;
    }
  } else {
    playerScores.push({initials,location,score});
  }
  playerScores=playerScores.filter(p=>p.score<=90).sort((a,b)=>a.score-b.score).slice(0,10);
  localStorage.setItem(playerKey,JSON.stringify(playerScores));
}

// Leaderboard screen display
function leaderboardScreen(){
  if(currentScreen!="leaderboard")return;
  generateDummyLeaderboard();
  let leaderboard=getMergedLeaderboard();
  image(backgroundImg2,0,0,width,height);

  stroke("black");
  strokeWeight(4);
  fill("white");

  if(initialsInput)initialsInput.hide();
  if(locationSelect)locationSelect.hide();

  if(saveButton){saveButton.visible=false;saveButton.enabled=false;}
  if(playButton){playButton.visible=false;playButton.enabled=false;}
  if(playButton2){playButton2.visible=false;playButton2.enabled=false;}

  push();
  noStroke();
  fill(0,0,0,180);
  const boxWidth=320;
  const boxHeight=400;
  rect(width/2-boxWidth-50,60,boxWidth-50,boxHeight,20);
  rect(width/2+110,60,boxWidth-50,boxHeight,20);
  pop();

  drawGui();

  fill("yellow");
  textAlign(CENTER);
  textSize(28);
  text("🏆 Daily Leaderboard 🏆",width/2,40);
  textSize(22);

  fill("white");
  const leftX=width/5;
  const rightX=(width/5)*4;
  const startY=100;
  const lineSpacing=75;

  for(let i=0;i<leaderboard.length;i++){
    let e=leaderboard[i];
    let colX=i<5?leftX:rightX;
    let rowY=startY+(i%5)*lineSpacing;
    text(`${i+1}. ${e.initials} - ${e.location}\nScore: ${e.score}s`,colX,rowY);
  }

  if(backButton&&backButton.isPressed){
    currentScreen="menu";
    createPlayButton(0);
  }
}

// Rest of your original code remains unmodified, including your gameplay, input, UI,

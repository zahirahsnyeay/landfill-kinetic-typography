var Engine = Matter.Engine,
  Composite = Matter.Composite,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var ground;
var leftWall, rightWall;
var bodiesMaxLength = 25;
var count = 0;

let particles = [];
let explosionCenter;
let isExploding = false;
let isMousePressed = false; // Flag to track mouse state


let mytext = "157 people died buried under the rubbish of leuwigajah landfill explosion";
let words = mytext.split(' ');

let img; 
let clickableState = true; 
let isRedBackground = false; 

let regularSound;
let explosionSound;
let isRegularSoundPlaying = false; 

function preload() {
  regularSound = loadSound('data/mysterious-melody.mp3'); // Regular sound
  explosionSound = loadSound('data/medium-explosion-40472.mp3'); // Explosion sound
    clickSound = loadSound('data/punch-or-kick-sound-effect-1-239696.mp3'); // click sound

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  stroke(255);
  strokeWeight(5);
  resetGroundAndWalls();
  
  img = loadImage('data/foto.jpg'); 
   img1 = loadImage('data/klikdesignzahirah.png'); 
  img2 = loadImage('data/tengkorakbyzahirah.png'); 
  img3 = loadImage('data/logobyzahirah.png'); 
}

function resetGame() {
  boxes = [];
  count = 0;
  particles = [];
  isExploding = false;
  clickableState = true; 
  resetGroundAndWalls();

  // Stop the regular sound if it's playing
  if (isRegularSoundPlaying) {
    regularSound.stop(); 
    isRegularSoundPlaying = false; 
  }
}

function resetGroundAndWalls() {
  if (ground) {
    Composite.remove(world, ground);
  }
  if (leftWall) {
    Composite.remove(world, leftWall);
  }
  if (rightWall) {
    Composite.remove(world, rightWall);
  }

  ground = Bodies.rectangle(width / 2, height, width, 1, { isStatic: true });
  leftWall = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
  rightWall = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });

  World.add(world, [ground, leftWall, rightWall]);
}

function mousePressed() {

  // klikbuatplaylagu
  if (count === 1 && !isRegularSoundPlaying) {
    regularSound.loop(); //mulaiplay
    isRegularSoundPlaying = true; // Set the flag to true
  }

  if (count === bodiesMaxLength) {
    Composite.remove(world, ground);
    Composite.remove(world, leftWall);
    Composite.remove(world, rightWall);
    explosionCenter = createVector(mouseX, mouseY);
    createExplosion();
  } else if (count < bodiesMaxLength) {
    clickSound.play();
    let sizee = random(50, 100);
    boxes.push(new Box(mouseX, mouseY, int(sizee) * 2, int(sizee), words[int(random(words.length - 1))]));
  }
  count++;
  
}



function bodiesUpdate() {
  if (boxes.length > bodiesMaxLength) {
    Composite.remove(world, boxes[0].body);
    boxes.splice(0, 1);
  }
}

function createExplosion() {
  isExploding = true;
  explosionSound.play(); // Play explosion sound
  regularSound.stop(); // Stop regular sound
  isRegularSoundPlaying = false; // Reset the flag
  let numParticles = 100;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(explosionCenter.x, explosionCenter.y));
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(2, 5));
    this.lifespan = 255;
    this.size = random(4, 8);
  }

  update() {
    this.position.add(this.velocity);
    this.lifespan -= 4;
  }

  display() {
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, this.size);
  }

  isFinished() {
    return this.lifespan < 0;
  }
}

function getDynamicTextSize() {
  return min(windowWidth, windowHeight) / 20; 
}

function drawWrappedText(txt, x, y, maxWidth) {
  let words = txt.split(' ');
  let line = '';
  let lineHeight = getDynamicTextSize(); 
  textSize(getDynamicTextSize());

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth && i > 0) {
      text(line, x, y);
      line = words[i] + ' ';
      y += lineHeight; 
    } else {
      line = testLine;
    }
  }
  text(line, x, y); 
}

function draw() {
  if (isExploding) {
    if (count < bodiesMaxLength + 2) { 
      if (frameCount % 10 === 0) { 
        isRedBackground = !isRedBackground; 
      }
      background(isRedBackground ? 'red' : 'black');
    } else {
      background(10); 
    }
  } else {
    background(10); 
  }

  if (count == 0) {
     // Display the image above the text
    imageMode(CENTER);
    let imgWidth = img1.width * 0.3;
    let imgHeight = img1.height * 0.3; 
    image(img1, windowWidth / 2, (windowHeight / 2.2 - getDynamicTextSize() * 2), imgWidth/2, imgHeight/2);
    strokeWeight(0);
    fill(255);
    textAlign(CENTER, CENTER);
    drawWrappedText("Continue clicking to see how your actions affect the environment.", windowWidth / 2, windowHeight / 2, windowWidth - 40);
  }

  bodiesUpdate();

  if (count == bodiesMaxLength + 2) {
    strokeWeight(0);
    fill(255);
    textAlign(CENTER, CENTER);
    
    // Display the image above the text
    imageMode(CENTER);
    let imgWidth = img.width * 0.2;
    let imgHeight = img.height * 0.2; 
    image(img, windowWidth / 2, (windowHeight / 2.5 - getDynamicTextSize() * 2), imgWidth/0.8, imgHeight/0.8);
    if (!isRegularSoundPlaying) {
      regularSound.loop(); 
      isRegularSoundPlaying = true; 
    }
    drawWrappedText("157 people died buried under the rubbish of leuwigajah landfill explosion.", windowWidth / 2, (windowHeight / 2) + 40, windowWidth - 40);
  }

  if (count == bodiesMaxLength + 3) {
     // Display the image above the text
    imageMode(CENTER);
    let imgWidth = img2.width * 0.3;
    let imgHeight = img2.height * 0.3; 
    image(img2, windowWidth / 2, (windowHeight / 2.1 - getDynamicTextSize() * 3), imgWidth/2, imgHeight/2);
    strokeWeight(0);
    fill(255);
    textAlign(CENTER, CENTER);
    let baseY = windowHeight / 2 + getDynamicTextSize(); 
    let lineHeight = getDynamicTextSize(); 
    let textBlock = "Each click has revealed the harsh reality of waste accumulation, leading to the tragic event that can take hundreds of lives.";
    
    drawWrappedText(textBlock, windowWidth / 2, windowHeight / 2, windowWidth - 40);
  }

  if (count == bodiesMaxLength + 4) {
    // Display the image above the text
    imageMode(CENTER);
    let imgWidth = img3.width * 0.3;
    let imgHeight = img3.height * 0.3; 
    image(img3, windowWidth / 2, (windowHeight / 2.1 - getDynamicTextSize() * 2.3), imgWidth/2, imgHeight/2);
    strokeWeight(0);
    fill(255);
    textAlign(CENTER, CENTER);
    drawWrappedText("Every small step counts: recycle, reduce plastic, compost, and choose sustainable.", windowWidth / 2, windowHeight / 2, windowWidth - 40);
  }

  if (count == bodiesMaxLength + 5) {
    clickableState = false; 
    resetGame();
  }

  if (isExploding) {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].isFinished()) {
        particles.splice(i, 1);
      }
    }
  }

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }

  stroke(170);
  strokeWeight(5);
  rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetGroundAndWalls();
}

let x = 0,
  y = 0,
  wayX = 1,
  wayY = 1,
  speed = 10;

const radius = 100;

function setup() {
  Clock.init({ trueTime: true });

  createCanvas(1, 1);
  windowResized();
  pixelDensity(1);
  background(0);
}

function draw() {
  // background(0);

  // moveBall();

  // fill(255);
  // ellipse(x, y, radius * 2);

  Clock.display({ scale: 1, black: true }); //display time on top left of canvas
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function moveBall() {

//     if (x < radius) {
//         wayX = 1;
//     } else if (x > width - radius) {
//         wayX = -1;
//     }

//     if (y < radius) {
//         wayY = 1;
//     } else if (y > height - radius) {
//         wayY = -1;
//     }

//     x += wayX * speed;
//     y += wayY * speed;
// }

Clock.onSecondChange = () => {
  // moveBall();
};

Clock.onMinuteChange = (event) => {
  console.log("Minutes changed:", event.value);
};

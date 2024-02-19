const gco = [
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

let gcIndex = gco.indexOf("darken");
const gradient = chroma.scale([
  "rgba(0, 0, 0, 0.7)", // 01:00
  "rgba(1, 20, 37, 0.7)", // 02:00
  "rgba(0, 42, 71, 0.7)", // 03:00
  "rgba(0, 64, 108, 0.6)", // 04:00
  "rgba(0, 65, 95, 0.5)", // 05:00
  "rgba(6, 91, 130, 0.5)", // 06:00
  "rgba(7, 92, 123, 0.4)", // 07:00
  "rgba(83, 186, 191, 0.3)", // 08:00
  "rgba(143, 218, 198, 0.2)", // 09:00
  "rgba(179, 218, 198, 0.1)", // 10:00
  "rgba(208, 223, 142, 0)", // 11:00
  "rgba(242, 218, 118, 0)", // 12:00
  "rgba(254, 203, 98, 0)", // 13:00
  "rgba(254, 208, 97, 0.1)", // 14:00
  "rgba(255, 164, 91, 0.1)", // 15:00
  "rgba(243, 141, 75, 0.1)", // 16:00
  "rgba(242, 124, 114, 0.1)", // 17:00
  "rgba(217, 108, 129, 0.2)", // 18:00
  "rgba(150, 70, 133, 0.3)", // 19:00
  "rgba(91, 43, 127, 0.4)", // 20:00
  "rgba(53, 27, 114, 0.5)", // 21:00
  "rgba(41, 35, 107, 0.5)", // 22:00
  "rgba(16, 29, 84, 0.5)", // 23:00
  "rgba(1, 20, 37, 0.6)", // 00:00
]);

// console.log(f(1).toString()); // #ff8000

const canvas = document.getElementById("monCanvas");
let TIME = 0;
const ctx = canvas.getContext("2d");
const position = { x: 0, y: 0 };
const camera = { x: 0, y: 0, zoom: 4 };
Clock.init({ trueTime: true });

const skyImg = new Image();
skyImg.src = "./images/ciel.jpeg";

for (let i = 0; i < 30; i++) {
  const item = createItem({
    // console.log(90 * i - 1000);
    parallax: random(1.2, 1.8),
    x: 80 * i - 1000,
    // x: -1000,
    // x: window.innerWidth / 2,
    y: 25,

    params: {
      ...buildParams({
        collection: IMAGES.maisons,
        scale: 0.08,
      }),
    },

    draw: DESSINS.maison,
  });
}

for (let i = 0; i < 30; i++) {
  createItem({
    parallax: random(1.6, 2),
    x: 10 * i - 5000,
    y: 25,
    params: {
      ...buildParams({
        collection: IMAGES.arbres,
        scale: 0.06,
      }),
    },

    draw: DESSINS.arbres,
  });
}

resizeFullscreen(canvas);

update();

function update(time = 0) {
  const { width, height } = canvas;
  // Clock.display({ scale: 1, black: true });

  Clock.tick(); //display time on top left of canvas

  const seconds =
    (Clock.getHours() * 60 + Clock.getMinutes()) * 60 + Clock.getSeconds();

  const millis = Clock.getMilliseconds() + seconds * 1000;
  const totalDayMillis = 24 * 60 * 60 * 1000;
  const t = millis / totalDayMillis;

  requestAnimationFrame(update);

  ctx.save();
  ctx.fillStyle = "black"; // background color
  ctx.fillRect(0, 0, width, height);
  // background image
  ctx.drawImage(skyImg, 0, 0, skyImg.width, skyImg.height, 0, 0, width, height);

  const center = {
    x: width / 2,
    y: height / 2,
  };
  camera.x = position.x - center.x;

  camera.y = 10;
  ctx.translate(center.x, center.y);

  drawItems();

  ctx.restore();

  // add a red filter
  ctx.save();
  // blendmode

  ctx.globalCompositeOperation = gco[gcIndex];

  // console.log(f(t).toString());
  ctx.fillStyle = gradient(t).toString();
  console.log(ctx.fillStyle);
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  TIME = time;
  position.x = (time / 3000) * -50;
}

window.addEventListener("resize", () => {
  resizeFullscreen(canvas);
});

window.addEventListener("mousemove", (event) => {
  // position.x = event.screenX;
});
window.addEventListener("keydown", (event) => {
  // position.x = event.screenX;
  // gcIndex = (gcIndex + 1) % gco.length;
  // console.log(gco[gcIndex]);
});

function resizeFullscreen(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
// Clock.onSecondChange = () => {
//   // moveBall();
// };

// Clock.onMinuteChange = (event) => {
//   console.log("Minutes changed:", event.value);
// };

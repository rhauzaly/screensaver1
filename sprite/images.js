const IMAGES = {};

IMAGES.maisons = [
  createAnim("./images/1_iris_#.png", 2),
  createAnim("./images/2_chat_#.png", 2),
  createAnim("./images/3_papier_#.png", 2),
  createAnim("./images/4.png"),
  // createAnim("./images/6.png"),
  createAnim("./images/7.png"),
  createAnim("./images/8.png"),
  createAnim("./images/9.png"),
  createAnim("./images/10.png"),
  createAnim("./images/11.png"),
  createAnim("./images/12.png"),
  createAnim("./images/13.png"),
  createAnim("./images/14.png"),
  createAnim("./images/15.png"),
  createAnim("./images/16.png"),
  createAnim("./images/17.png"),
  createAnim("./images/18.png"),
  createAnim("./images/19_#.png", 2),
  createAnim("./images/20.png"),
  createAnim("./images/21.png"),
  createAnim("./images/23_#.png", 2),
  createAnim("./images/cat_#.png", 2),
];
IMAGES.arbres = [
  createAnim("./images/feu_#.png", 2),
  createAnim("./images/5.png"),
  createAnim("./images/off_#.png", 2),
  createAnim("./images/poubelle_#.png", 2),
  createAnim("./images/distri.png"),
  createAnim("./images/arbre.png"),
  createAnim("./images/arbre2.png"),
  createAnim("./images/22.png"),
  createAnim("./images/arbre3_#.png", 2),
  createAnim("./images/buis_#.png", 2),
  createAnim("./images/dist_#.png", 2),
  createAnim("./images/plot.png"),
  createAnim("./images/poto_#.png", 2),
];

function createAnim(url, nFrames = 1) {
  const frames = [];

  for (let i = 0; i < nFrames; i++) {
    const src = url.replace("#", i);
    let img = new Image();
    // img.onload;
    img.src = src; // Mettez le chemin de votre image PNG ici
    frames.push(img);
  }

  return frames;
}

function randomElement(images) {
  return images[Math.floor(Math.random() * images.length)];
}

function buildParams(options) {
  const { scale = 1, collection } = options;

  const frames = randomElement(collection);

  const [firstFrame] = frames;

  return {
    scale,
    frames,
    collection,
    width: firstFrame.width * scale,
    height: firstFrame.height * scale,
  };
}

function getFrame(frames) {
  const index = Math.floor(TIME / 1000) % frames.length;
  return frames[index];
}

// function randomArbre(images) {
//
// }

const DESSINS = {};

DESSINS.maison = (item) => {
  //calculate x y width height based on image size -> make bottom left corner of image the origin -> y = -height
  let x = 0;
  let y = -item.params.height;
  let w = item.params.width;
  let h = item.params.height;
  ctx.drawImage(getFrame(item.params.frames), x, y, w, h); // Ajustez les dimensions et la position selon vos besoins
};

DESSINS.arbres = (item) => {
  let x = 0;
  let y = -item.params.height;
  let w = item.params.width;
  let h = item.params.height;

  ctx.drawImage(getFrame(item.params.frames), x, y, w, h);
};

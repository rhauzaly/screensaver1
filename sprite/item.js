const items = [];

class Item {
  constructor({
    parallax = 1,
    color = "red",
    x = 0,
    y = 0,
    draw = defaultDraw,
    params = {},
  }) {
    this.parallax = parallax;
    this.x = x;
    this.y = y;
    this.color = color;
    this.draw = draw;
    this.params = params;
  }

  getScale() {
    return this.parallax * camera.zoom;
  }

  display() {
    ctx.save();
    ctx.fillStyle = this.color;
    const position = this.screenToWorld(this.x, this.y);
    // ctx.fillRect(position.x, position.y, 100, 100)
    ctx.scale(this.getScale(), this.getScale());
    ctx.translate(position.x, position.y);

    this.draw(this);
    // ctx.fillRect(0, 0, 10, 10);
    ctx.restore();
  }

  isOutside() {
    const position = this.screenToWorld(this.x, this.y);
    const width = this.params.width;
    return (
      (position.x + this.params.width) * this.getScale() +
        window.innerWidth / 2 <
      0
    );
  }

  screenToWorld(x, y) {
    x = (x + camera.x) * this.parallax;
    y = (y + camera.y) * this.parallax;

    return { x, y };
  }

  moveToEnd() {
    this.x +=
      (window.innerWidth * (this.parallax + Math.random())) / (camera.zoom * 1);
  }

  changeImage() {
    this.params = {
      ...buildParams(this.params),
    };
  }
}

function drawItems() {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    item.display();
  }

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (item.isOutside()) {
      // console.log("removed");
      // items.splice(i, 1);
      item.moveToEnd();
      item.changeImage();
    }
  }
}

function createItem(options) {
  const newItem = new Item(options);
  // items.push(newItem)

  // push based on parralax
  if (items.length === 0) {
    items.push(newItem);
    return;
  }

  // push item in sorted parallax order
  let index = 0;
  for (let item of items) {
    if (item.parallax <= newItem.parallax) {
      break;
    }
    index++;
  }
  items.splice(index, 0, newItem);

  return newItem;
}

function defaultDraw() {}

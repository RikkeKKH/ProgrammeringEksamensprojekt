let test;

function setup() {
  createCanvas(windowWidth, windowHeight);

  test = createSlider(10, 100, 100, 5);
  test.position(10, 10);
  test.size(100);
}

let vinkel = 0,
  v2 = 10;

function draw() {
  background(220);

  v2 = test.value();

  translate(width / 2, height / 2);

  rotate(vinkel);

  rect(-200, 10, 400, 20);

  vinkel += PI / v2;
}

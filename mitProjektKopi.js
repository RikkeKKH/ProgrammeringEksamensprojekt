let stang, cylinder, kugle, cylindrisk_ring, kegle, plade;
let roter = false,
  vinkel = 0;

function preload() {
  stang = loadImage("Former/stang.png");
  cylinder = loadImage("Former/Cylinder.png");
  kugle = loadImage("Former/Kugle.png");
  kugleskal = loadImage("Former/Kugleskal.png");
  cylindrisk_ring = loadImage("Former/Cylindrisk_ring.png");
  kegle = loadImage("Former/kegle.png");
  plade = loadImage("Former/Plade.png");
}

class slider {
  constructor(navn, mindst, max, start, interval, x, y, enhed) {
    this.navn = navn;
    this.slider = createSlider(mindst, max, start, interval);
    this.slider.position(x, y);
    this.slider.size(80);
    this.enhed = enhed;
  }
  Info() {
    fill("black");
    text(
      this.navn + ":" + this.slider.value() + this.enhed,
      this.slider.x + 100,
      this.slider.y + 20
    );
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  radius = new slider("radius", 50, 300, 50, 50, 10, 50, "cm");
  masse = new slider("masee", 100, 1000, 100, 100, 10, 10, "g");
  legeme = new slider("legeme", 1, 7, 1, 1, windowWidth - 100, 10);
  radius_2 = new slider("indre radius", 10, 300, 10, 10, 10, 90, "cm");
  // prettier-ignore
  afstand = new slider("afstand fra masssemidtpunktet", 0, 300, 0, 50, 10, 130, "cm");

  knap = createButton("roter");
  knap.position(10, 170);
  knap.mousePressed(() => {
    roter = !roter;
    vinkel = 0;
  });
}

let f, a, m, r;
let I, billede;

function draw() {
  background("white");

  radius.Info();
  masse.Info();
  radius_2.Info();
  afstand.Info();

  f = legeme.slider.value();
  a = afstand.slider.value();
  m = masse.slider.value();
  r = radius.slider.value();
  r_2 = radius_2.slider.value();

  fill(200 - m / 10);

  push();
  translate(width / 2 + a, height / 2);

  if (roter === true) {
    rotate(vinkel);
    vinkel += PI / 90;
  }

  if (f === 1) {
    // prettier-ignore
    I =(1 / 12) * m * r ** 2 + (m * a ** 2);

    rect(0 - a - r, -5, r * 2, 10);
    form = "stang";
    billede = stang;
  }
  if (f === 2) {
    // prettier-ignore
    I =(1/2)*m*r**2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
    form = "cylinder";
    billede = cylinder;
  }
  if (f === 3) {
    // prettier-ignore
    I =(2/5)*m*r**2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
    form = "kugle";
    billede = kugle;
  }
  if (f === 4) {
    // prettier-ignore
    I = (2 / 3) * m * r ** 2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
    form = "tynd kugleskal";
    billede = kugleskal;
  }
  if (f === 5) {
    // prettier-ignore
    I = (1 / 2) * m * (r ** 2 + r_2 ** 2) + (m * a ** 2);

    circle(0 - a, 0, r * 2);
    fill("white");
    circle(0 - a, 0, r_2 * 2);
    form = "cylindrisk ring";
    billede = cylindrisk_ring;
  }
  if (f === 6) {
    // prettier-ignore
    I=(3/10)*m*r**2+(m * a ** 2);

    circle(0 - a, 0, r * 2);
    form = "kegle";
    billede = kegle;
  }
  if (f === 7) {
    // prettier-ignore
    I=(1/12)*m*(r**2+r_2**2);

    rect(0 - a - r, 0 - r_2, r * 2, r_2 * 2);

    form = "plade";
    billede = plade;
  }

  fill("black");
  circle(0, 0, 5);

  pop();

  image(billede, windowWidth - 225, windowHeight - 225, 225, 225);
}

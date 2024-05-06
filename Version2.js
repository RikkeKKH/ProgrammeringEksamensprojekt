let stang, cylinder, kugle, cylindrisk_ring, kegle, plade;
let roter = false,
  vinkel = 0;
v2 = 10;

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

class slidetal {
  constructor(slider) {
    this.slider = slider;
    this.tal = slider.value();
    let ref = this;
    this.slider.elt.addEventListener("input", () => {
      ref.tal = ref.slider.value();
    });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  radius = new slider("radius", 50, 300, 50, 50, 10, 50, "cm");
  radius.value;
  masse = new slider("masee", 1, 15, 1, 1, 10, 10, "kg");
  legeme = new slider("legeme", 1, 7, 1, 1, windowWidth - 100, 10);
  radius_2 = new slider("indre radius", 10, 300, 10, 10, 10, 90, "cm");
  // prettier-ignore
  afstand = new slider("afstand fra masssemidtpunktet", 0, 300, 0, 50, 10, 130, "cm");

  knap = createButton("roter");
  knap.position(10, 170);
  knap.mousePressed(() => {
    roter = !roter;
    vinkel = 0;
    v2 = 1;
  });
}

let f, a, m, r;
let I, billede;

function draw() {
  background("white");
}

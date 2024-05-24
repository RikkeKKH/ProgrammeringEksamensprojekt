let stang, cylinder, kugle, cylindrisk_ring, kegle, plade;
let roter = false,
  vinkel,
  vinkel2,
  v1,
  v2;

function preload() {
  stang = loadImage("Former/stang.png");
  cylinder = loadImage("Former/Cylinder.png");
  kugle = loadImage("Former/Kugle.png");
  kugleskal = loadImage("Former/Kugleskal.png");
  cylindrisk_ring = loadImage("Former/Cylindrisk_ring.png");
  kegle = loadImage("Former/kegle.png");
  plade = loadImage("Former/Plade.png");
}
// prettier-ignore

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

let Flerelegemer, billeder, former;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  // prettier-ignore
  billeder=[stang,cylinder,kugle,kugleskal,cylindrisk_ring,kegle,plade];
  // prettier-ignore
  former =["Stang","Cylinder","Kugle","Kugleskal","Cylindrisk ring","kegle","plade"];

  radius = new slider("radius", 50, 300, 50, 50, 10, 80, "cm");
  masse = new slider("masee", 1, 15, 1, 1, 10, 40, "kg");
  legeme = new slider("legeme", 1, 7, 1, 1, windowWidth - 125, 40);
  radius_2 = new slider("radius 2 ", 10, 300, 10, 10, 10, 120, "cm");
  // prettier-ignore
  afstand = new slider("afstand fra masssemidtpunktet", 0, 300, 0, 50, 10, 160, "cm");

  Flerelegemer = createCheckbox("legeme nr. 2");
  Flerelegemer.position(10, 220);

  radius2 = new slider("radius", 50, 300, 50, 50, 10, 300, "cm");
  masse2 = new slider("masee", 1, 15, 1, 1, 10, 260, "kg");
  legeme2 = new slider("legeme", 1, 7, 1, 1, windowWidth - 125, 360);
  radius2_2 = new slider("radius 2 ", 10, 300, 10, 10, 10, 340, "cm");
  // prettier-ignore
  afstand2 = new slider("afstand fra masssemidtpunktet", 0, 300, 50, 50, 10, 380, "cm");

  // prettier-ignore
  acceleration = new slider("vinkelacceleration", 0, 1, 0.1, 0.01, 10, 500, "");

  knap = createButton("roter");
  knap.position(10, 460);
  knap.mousePressed(() => {
    roter = !roter;
    vinkel = 0;
    vinkel2 = 0;
    v1 = 1;
    v2 = 1;
  });
}

let f, a, m, r;
let I, I2;

function draw() {
  background("white");

  radius.Info();
  masse.Info();
  radius_2.Info();
  afstand.Info();
  text("acceleration", 100, 515);

  f = legeme.slider.value();
  a = afstand.slider.value();
  m = masse.slider.value();
  r = radius.slider.value();
  r_2 = radius_2.slider.value();
  h = acceleration.slider.value();

  push();
  stroke("black");
  fill(215, 10 + (m - 1) * 6, 100 - (m - 1) * 3);
  translate(width / 2 + a, height / 2);

  if (roter === true) {
    rotate(vinkel);
    vinkel += PI * (v1 / I);

    v1 = v1 + h;
  }

  if (f === 1) {
    // prettier-ignore
    I =(1 / 12) * m * r ** 2 + (m * a ** 2);

    rect(0 - a - r, -5, r * 2, 10);
  }
  if (f === 2) {
    // prettier-ignore
    I =(1/2)*m*r**2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
  }
  if (f === 3) {
    // prettier-ignore
    I =(2/5)*m*r**2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
  }
  if (f === 4) {
    // prettier-ignore
    I = (2 / 3) * m * r ** 2 + (m * a ** 2);

    circle(0 - a, 0, r * 2);
  }
  if (f === 5) {
    // prettier-ignore
    I = (1 / 2) * m * (r ** 2 + r_2 ** 2) + (m * a ** 2);

    circle(0 - a, 0, r * 2);
    fill("white");
    circle(0 - a, 0, r_2 * 2);
  }
  if (f === 6) {
    // prettier-ignore
    I=(3/10)*m*r**2+(m * a ** 2);

    circle(0 - a, 0, r * 2);
  }
  if (f === 7) {
    // prettier-ignore
    I=(1/12)*m*(r**2+r_2**2);

    rect(0 - a - r, 0 - r_2, r * 2, r_2 * 2);
  }

  fill("black");
  circle(0, 0, 5);

  if (f > 1 && f < 7 && a === 0) {
    fill("white");
    circle(0 - r, 0, 10);
  }

  pop();

  image(billeder[f - 1], windowWidth - 180, 40, 200, 200);
  text(former[f - 1], windowWidth - 105, 250);

  fill("black");
  text("Inertimoment:  " + Math.round(I) + "·10⁻⁴·kg·m²", 10, 550);

  //Samme kode gentages for legeme nr.2

  f2 = legeme2.slider.value();
  a2 = afstand2.slider.value();
  m2 = masse2.slider.value();
  r2 = radius2.slider.value();
  r2_2 = radius2_2.slider.value();

  if (Flerelegemer.checked()) {
    radius2.Info();
    masse2.Info();
    radius2_2.Info();
    afstand2.Info();

    push();
    translate(width / 2 + a, height / 2);

    if (roter === true) {
      rotate(vinkel2);
      vinkel2 += PI * (v2 / I2);

      v2 = v2 + h;
    }

    fill(0, 10 + (m2 - 1) * 6, 100 - (m2 - 1) * 3);

    if (f2 === 1) {
      // prettier-ignore
      I2 =(1 / 12) * m2 * r2 ** 2 + (m2 * a2 ** 2);
      rect(0 + a2 - r2, -5, r2 * 2, 10);
    }
    if (f2 === 2) {
      // prettier-ignore
      I2 =(1/2)*m2*r2**2 + (m2 * a2 ** 2);

      circle(0 + a2, 0, r2 * 2);
    }
    if (f2 === 3) {
      // prettier-ignore
      I2 =(2/5)*m2*r2**2 + (m2 * a2 ** 2);

      circle(0 + a2, 0, r2 * 2);
    }
    if (f2 === 4) {
      // prettier-ignore
      I2 = (2 / 3) * m2 * r2 ** 2 + (m2 * a2 ** 2);

      circle(0 + a2, 0, r2 * 2);
    }
    if (f2 === 5) {
      // prettier-ignore
      I2 = (1 / 2) * m2 * (r2 ** 2 + r2_2 ** 2) + (m2 * a2 ** 2);

      beginClip({ invert: true });
      circle(0 + a2, 0, r2_2 * 2);
      endClip();
      circle(0 + a2, 0, r2 * 2);
    }
    if (f2 === 6) {
      // prettier-ignore
      I2=(3/10)*m2*r2**2+(m2 * a2 ** 2);

      circle(0 + a2, 0, r2 * 2);
    }
    if (f2 === 7) {
      // prettier-ignore
      I2=(1/12)*m2*(r2**2+r2_2**2);

      rect(0 + a2 - r2, 0 - r2_2, r2 * 2, r2_2 * 2);
    }

    fill("black");
    circle(0, 0, 5);

    if (f2 > 1 && f2 < 7 && a2 === 0) {
      fill("white");
      circle(0 - r2, 0, 10);
    }

    pop();

    image(billeder[f2 - 1], windowWidth - 180, 360, 200, 200);
    text(former[f2 - 1], windowWidth - 105, 570);

    text("Inertimoment nr. 2:  " + Math.round(I2) + "·10⁻⁴·kg·m²", 10, 570);
  }
}

var w = document.getElementById("canvasHolder").offsetWidth;
var h = document.getElementById("canvasHolder").offsetHeight;
var particles_a = [];
var particles_b = [];
var particles_c = [];
var scale;
var rows;
var cols;
var nums;
var noiseScale;
var speed = 0.3;
var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(w, h);
    scale = 130;
    rows = (h / scale);
    cols = (w / scale*2);
    noiseScale = 900;
    nums = rows * cols;
    console.log(nums);
    sketch.noStroke();
    sketch.background(20,19,31);
    for (var i = 0; i < nums; i++) {
      particles_a[i] = new Particle(sketch.random(0, w/2), sketch.random(0, h),this);
      particles_b[i] = new Particle(sketch.random(0, w/2), sketch.random(0, h),this);
      particles_c[i] = new Particle(sketch.random(0, w/2), sketch.random(0, h),this);
    }
  };

  sketch.draw = function () {
    sketch.fill(20,19,31,4);
    sketch.rect(0, 0, w, h);
    for (var i = 0; i < nums; i++) {
      var radius = sketch.map(i, 0, nums, 1, 3);
      
      sketch.fill(230, 19, 70, 255);
      particles_a[i].move();
      particles_a[i].display(radius);

      sketch.fill(124, 19, 255, 255);
      particles_b[i].move();
      particles_b[i].display(radius);

      sketch.fill(25, 19, 137, 255);
      particles_c[i].move();
      particles_c[i].display(radius);
    }
  };
}

function Particle(x, y,sketch) {
  this.pos = {x:x,y:y};
  this.age = Math.random()*500+500;
  this.move = function () {
    var angle = sketch.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * sketch.TWO_PI * noiseScale;
    this.pos.x += Math.cos(angle)*speed ;
    this.pos.y += Math.sin(angle)*speed ;
    this.age--;
    this.checkEdge();
  }

  this.checkEdge = function () {
    if ((this.pos.x > w/2) || (this.pos.x < 0) || (this.pos.y > h) || (this.pos.y < 0) ||(this.age<=0)) {
      this.pos.x = Math.random()*w/2;
      this.pos.y = Math.random()*h;
      this.age = sketch.random()*500 + 500;
    }
  }

  this.display = function (r) {
    sketch.ellipse(this.pos.x, this.pos.y, r, r);
    sketch.ellipse(w-this.pos.x, this.pos.y, r, r);
  }
}
var myp5 = new p5(s, document.getElementById('sketchHolder'));
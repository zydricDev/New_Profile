// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/canvasHome.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Gradient{
  constructor(r,g,b){
    this.r = r
    this.g = g
    this.b = b
  }
}

class Pop_Words {
  constructor(ltr, x, y, size, doResize){
      this.ltr = ltr
      this.x = x
      this.y = y
      this.opac = 0

      this.size = size

      this.doResize = doResize
      this.drawn = false

      this.mouseX = 0
      this.mouseY = 0

      this.day = false


  }

  draw(){
    c.fillStyle = `rgba(255, 255, 255, ${this.opac})`

    if(cycleAry[0].frames == 550){
      this.day = !this.day
    }


    if(this.opac < 1){
      this.opac += 0.2
    }
    if(this.opac >= 1 && this.drawn == false){
      this.doResize = false
      this.drawn = true
    }

    c.font = this.size+'px Bungee'

    if(this.drawn == false && this.opac < 0.5){
      this.size += 4
    }
    if(this.drawn == false && this.opac >= 0.5){
      this.size -= 4
    }

    if(this.mouseX >= this.x &&
      this.mouseX <= this.x+20 &&

      this.mouseY >= this.y-20 &&
      this.mouseY <= this.y &&

      this.drawn == true &&
      this.size < 40){

      this.size +=10
    }


    if(
      (this.mouseX < this.x ||
      this.mouseX > this.x+20) &&

      /*
      (this.mouseY < this.y-20 ||
      this.mouseY > this.y) &&*/

      this.drawn == true &&
      this.size > 30){
      this.size -=2
    }

    /*if(this.size >= 32){
      this.size -=2
    }*/
    if(this.size >=40){
      c.fillStyle = "red";
    }
    c.fillText(this.ltr, this.x, this.y)
    c.fillStyle = "black";
  }
  update(){


    if(this.doResize == true || this.drawn == true){
      this.draw()
    }

  }

}

class Fade_Words {
  constructor(ltr, x, y, opac, size, drawn){
    this.ltr = ltr
    this.x = x
    this.y = y
    this.opac = opac
    this.size = size
    this.drawn = drawn
  }

  draw(){
    c.fillStyle = `rgb(255, 255, 255, ${this.opac})`;
    if(this.opac < 1 && this.drawn == false){
      this.opac += 0.03
    }
    if(this.opac >= 1 && this.drawn == false){
      this.drawn = true
    }
    c.font = this.size+'px Bungee'
    c.fillText(this.ltr, this.x, this.y, 500)
    c.fillStyle = "black";
  }

  update(){
    this.draw()
  }

}

class Cycle {
  constructor(radius, newArc, prevArc, onCycle, onTop){
    this.radius = radius

    this.newArc = newArc
    this.prevArc = prevArc

    this.onTop = onTop

    this.pause = false
    this.frames = 0
    this.timer = 0

    this.day = true

    this.originalCycle = onCycle
    this.tracker = 180
    this.onCycle = onCycle
    this.transition = false

  }
  draw(){
    c.beginPath()

    c.arc(canvas.width/2-100, canvas.height/2+290, this.radius, this.prevArc, this.newArc , false)

    let gradient = c.createLinearGradient(0, 300, 0, 0)
    if(this.onCycle == 1){
      gradient.addColorStop(0, `rgb(${dayAry[0].r},${dayAry[0].g},${dayAry[0].b})`);
      gradient.addColorStop(0.24, `rgb(${dayAry[1].r},${dayAry[1].g},${dayAry[1].b})`);
      gradient.addColorStop(0.42, `rgb(${dayAry[2].r},${dayAry[2].g},${dayAry[2].b})`);
      gradient.addColorStop(1, `rgb(${dayAry[3].r},${dayAry[3].g},${dayAry[3].b})`);
    }
    if(this.onCycle == 2 && this.onTop == false){ this.onCycle = 1 }
    if(this.onCycle == 2 && this.onTop == true){
      if(this.transition == false){
        this.transition = true
        this.tracker = 1

      }

      gradient.addColorStop(0, `rgb(${(dayAry[0].r-nightAry[0].r)/-180 * this.tracker + dayAry[0].r},
                                    ${(dayAry[0].g-nightAry[0].g)/-180 * this.tracker + dayAry[0].g},
                                    ${(dayAry[0].b-nightAry[0].b)/-180 * this.tracker + dayAry[0].b})`);

      gradient.addColorStop(0.24, `rgb(${(dayAry[1].r-nightAry[1].r)/-180 * this.tracker + dayAry[1].r},
                                       ${(dayAry[1].g-nightAry[1].g)/-180 * this.tracker + dayAry[1].g},
                                       ${(dayAry[1].b-nightAry[1].b)/-180 * this.tracker + dayAry[1].b})`);

      gradient.addColorStop(0.42, `rgb(${(dayAry[2].r-nightAry[2].r)/-180 * this.tracker + dayAry[2].r},
                                       ${(dayAry[2].g-nightAry[2].g)/-180 * this.tracker + dayAry[2].g},
                                       ${(dayAry[2].b-nightAry[2].b)/-180 * this.tracker + dayAry[2].b})`);

      gradient.addColorStop(1, `rgb(${(dayAry[3].r-nightAry[3].r)/-180 * this.tracker + dayAry[3].r},
                                    ${(dayAry[3].g-nightAry[3].g)/-180 * this.tracker + dayAry[3].g},
                                    ${(dayAry[3].b-nightAry[3].b)/-180 * this.tracker + dayAry[3].b})`);
      if(this.tracker <= 180 && this.frames > 500){
        this.tracker += 1

      }



    }

    if(this.onCycle == 3){
      gradient.addColorStop(0, `rgb(${nightAry[0].r},${nightAry[0].g},${nightAry[0].b})`);
      gradient.addColorStop(0.24, `rgb(${nightAry[1].r},${nightAry[1].g},${nightAry[1].b})`);
      gradient.addColorStop(0.42, `rgb(${nightAry[2].r},${nightAry[2].g},${nightAry[2].b})`);
      gradient.addColorStop(1, `rgb(${nightAry[3].r},${nightAry[3].g},${nightAry[3].b})`);
    }
    if(this.onCycle == 4 && this.onTop == false){ this.onCycle = 3 }
    if(this.onCycle == 4 && this.onTop == true){
      if(this.transition == false){

        this.transition = true
        this.tracker = 1
      }

      gradient.addColorStop(0, `rgb(${(nightAry[0].r-dayAry[0].r)/-180 * this.tracker + nightAry[0].r},
                                    ${(nightAry[0].g-dayAry[0].g)/-180 * this.tracker + nightAry[0].g},
                                    ${(nightAry[0].b-dayAry[0].b)/-180 * this.tracker + nightAry[0].b})`);

      gradient.addColorStop(0.24, `rgb(${(nightAry[1].r-dayAry[1].r)/-180 * this.tracker + nightAry[1].r},
                                       ${(nightAry[1].g-dayAry[1].g)/-180 * this.tracker + nightAry[1].g},
                                       ${(nightAry[1].b-dayAry[1].b)/-180 * this.tracker + nightAry[1].b})`);

      gradient.addColorStop(0.42, `rgb(${(nightAry[2].r-dayAry[2].r)/-180 * this.tracker + nightAry[2].r},
                                       ${(nightAry[2].g-dayAry[2].g)/-180 * this.tracker + nightAry[2].g},
                                       ${(nightAry[2].b-dayAry[2].b)/-180 * this.tracker + nightAry[2].b})`);

      gradient.addColorStop(1, `rgb(${(nightAry[3].r-dayAry[3].r)/-180 * this.tracker + nightAry[3].r},
                                    ${(nightAry[3].g-dayAry[3].g)/-180 * this.tracker + nightAry[3].g},
                                    ${(nightAry[3].b-dayAry[3].b)/-180 * this.tracker + nightAry[3].b})`);
      if(this.tracker <= 180 && this.frames > 500){
        this.tracker += 1

      }



    }

    c.fillStyle = gradient

    c.fill()
    c.closePath()

    if(this.frames > 500){
      if(this.frames == 501){
        this.onCycle += 1
      }
      if(this.newArc > Math.PI * 2){
        this.newArc = 0
        this.prevArc = Math.PI
      }
      if(this.prevArc > Math.PI * 2){
        this.prevArc = 0
        this.newArc = Math.PI
      }
      this.newArc += 0.01745
      this.prevArc += 0.01745

      this.timer += 1
      if(this.timer >= 180){
        this.day = !this.day
        this.onTop = !this.onTop
        this.onCycle = this.originalCycle
        this.transition = false

        if(this.newArc >= Math.PI / 2 && this.newArc < Math.PI * 1.75){
          this.newArc = Math.PI
          this.prevArc = 0
        }
        if((this.newArc >= Math.PI * 1.75 && this.newArc <= Math.PI * 2.5) || this.newArc < Math.PI / 2){
          this.newArc = 0
          this.prevArc = Math.PI
        }

        this.frames = 0
        this.timer = 0
      }
    }

    this.frames +=1




    c.fillStyle = "black"
  }
  update(){
    this.draw()

  }
}
//

class Stars{
  constructor(x,y,color, radians, pivotX, pivotY){
    this.x = x
    this.y = y
    this.color = color
    this.radians = radians
    this.pivotX = pivotX
    this.pivotY = pivotY

    this.trailX = [this.x, this.x, this.x, this.x, this.x]
    this.trailY = [this.y, this.y, this.y, this.y, this.y]

    this.trailSubX = []
    this.trailSubY = []

    this.colorSet = ["153, 255, 255","0, 0, 255","84, 90, 167","70, 143, 234","255, 149, 41", "253, 204, 13"]
    this.uniqueSpeed = Math.random()
    this.uniqueColor = this.colorSet[Math.floor(Math.random()*this.colorSet.length)]

  }
  draw(){

    for(let i=0; i<this.trailX.length -1; i++){
      this.trailSubX[i]=this.trailX[i]
      this.trailSubY[i]=this.trailY[i]
    }

    for(let i=1; i<this.trailX.length; i++){
      this.trailX[i] = this.trailSubX[i-1]
      this.trailY[i] = this.trailSubY[i-1]
    }
    this.trailX[0] = this.x
    this.trailY[0] = this.y



    for(let i=1; i<this.trailX.length; i++){

      let ratio = (this.trailX.length - i ) / this.trailX.length;
      c.beginPath()
      c.moveTo(this.trailX[i-1], this.trailY[i-1])
      c.lineTo(this.trailX[i], this.trailY[i])
      c.strokeStyle = `rgba(${this.uniqueColor},${ratio})`
      c.lineWidth = 13;
      c.stroke()
      c.closePath()



    }


    c.beginPath()
    c.arc(this.trailX[0], this.trailY[0], 7, 0, Math.PI*2, false)
    c.fillStyle = `rgba(${this.uniqueColor}, 0.7)`
    c.shadowColor = `rgba(${this.uniqueColor})`
    c.shadowBlur = 10
    c.fill()
    c.shadowBlur = 0
    c.closePath()

    /**
    c.moveTo(this.x, this.y);
    c.lineTo(this.pivotX, this.pivotY);
    c.stroke();

    c.beginPath()
    c.arc(this.pivotX, this.pivotY, 5, 0, Math.PI*2, false)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
    **/
    var xSub = this.x - this.pivotX
    var ySub = this.y - this.pivotY

    this.radians = 0.01745 * (2 * this.uniqueSpeed)

    var xSub2 = xSub * Math.cos(this.radians) - Math.sin(this.radians) * ySub
    var ySub2 = xSub * Math.sin(this.radians) + Math.cos(this.radians) * ySub

    this.x = xSub2 + this.pivotX
    this.y = ySub2 + this.pivotY
    //this.x = this.x + Math.cos(this.radians) * 10
    //this.y = this.y + Math.sin(this.radians) * 10



    c.fillStyle = 'black'
  }



  update(){
    this.draw()
  }
}

class City{
  constructor(source, delay){
    this.source = source
    this.delay = delay
    this.frame = 0
    this.y = 500 //go to 50
    this.bounce = false
    this.switch = false
    this.img = new Image();

    this.img.src = this.source
  }
  draw(){
    if(this.frame >= this.delay){

      c.drawImage(this.img, -100, this.y, canvas.width, 800)
    }else{ this.frame += 1 }

    if(this.y > 50 && this.frame >= this.delay && this.bounce == false){
      this.y -= 28.57
      if(this.y <= 50){
        this.y = 50
        this.bounce = true
      }
    }

    if(this.bounce == true){
      if(this.y >= 60 || this.switch == true){
        this.switch = true
        if(this.y > 50){ this.y -= 2 }

      }
      if(this.switch == false && this.y < 60){
        this.y += 2
      }

    }

  }

  update(){
    this.draw()
  }
}

class Text_Background{
  constructor(x,y,color,height,width, offset){
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.offset = offset
  }
  draw(){
    c.beginPath()
    c.fillStyle = this.color

    c.moveTo(this.x,this.y) // 1
    c.lineTo(this.x + this.width - 5, this.y + 20)
    c.lineTo(this.x + this.width, this.y + this.height / 5) //3
    c.lineTo(-this.offset*2.5 + this.x + this.width + this.width / 20, -this.offset + this.y + this.height / 4.286) //4 20:70
    c.lineTo(-this.offset*2.5 + this.x + this.width + this.width / 20, -this.offset + this.y + this.height / 6) //5 20:50
    c.lineTo(-this.offset + this.x + this.width + this.width / 6.67, this.y + this.height / 3.75) //6 60:80
    c.lineTo(-this.offset + this.x + this.width + this.width / 11.43, this.offset * 1.5 + this.y + this.height / 4.286) // 7 35:70
    c.lineTo(-this.offset + this.x + this.width + this.width / 10, this.y + this.height / 3) //8 40:100
    c.lineTo(this.x + this.width + this.width / 80, this.offset + this.y + this.height / 3.33) // 9 5:90
    c.lineTo(this.x + this.width + this.width / 16, this.y + this.height - this.height / 7.5)
    c.lineTo(this.x + 10, this.y + this.height)
    c.lineTo(this.x,this.y)


    c.strokeStyle = "transparent";
    c.stroke()
    c.fill()
    //c.fillRect(this.x, this.y, this.height, this.width)
    //c.fillRect(-50,-50,400,300)
    c.closePath()
  }
  update(){
    this.draw()
  }
}

class Logo_Background{
  constructor(x, y, height, width, angle){
    this.x = x
    this.y = y

    this.height = height
    this.width = width
    this.angle = angle
  }
  draw(){
    c.beginPath()
    c.fillStyle = 'white'
    c.moveTo(this.x,this.y)
    c.lineTo(this.x + this.width, this.y)
    c.lineTo(this.x + this.width, this.y + this.height)
    c.lineTo(this.x, this.y + this.height)
    c.stroke()
    c.fill()
    c.closePath()

    c.beginPath()
    c.fillStyle = 'black'
    c.moveTo(this.x + this.width/15,this.y + this.height/10)
    c.lineTo(this.x + this.width - this.width/10, this.y + this.width/15)
    c.lineTo(this.x + this.width - this.width/15, this.y + this.height - this.width/7.5)
    c.lineTo(this.x + this.width/10, this.y + this.height - this.height/10)
    c.stroke()
    c.fill()
    c.closePath()
  }
  update(){
    this.draw()
  }
}

class Default_Background{
  constructor(){
    this.gradient = c.createLinearGradient(0, 300, 0, 0)
  }
  draw(){
    c.beginPath()
    c.rect(-100, -100, canvas.width, canvas.height);
    this.gradient.addColorStop(0, `rgb(${dayAry[0].r},${dayAry[0].g},${dayAry[0].b})`);
    this.gradient.addColorStop(0.24, `rgb(${dayAry[1].r},${dayAry[1].g},${dayAry[1].b})`);
    this.gradient.addColorStop(0.42, `rgb(${dayAry[2].r},${dayAry[2].g},${dayAry[2].b})`);
    this.gradient.addColorStop(1, `rgb(${dayAry[3].r},${dayAry[3].g},${dayAry[3].b})`);
    c.fillStyle = this.gradient
    c.fill()
    c.closePath()
  }
  update(){
    this.draw()
  }

}

function setup(){
  var sub = 0
  sentenceAry = []
  starAry = []
  words = "Hi,I'm Zydric,web developer"

  desc = "Megamind was a great movie"
  word_offset_X = 100
  word_offset_Y = 50

  description = new Fade_Words(desc, 0+word_offset_X, 150+word_offset_Y, 0, 15, false)

  for(var i=0; i<words.length; i++){

    if(i==0){
      sentenceAry.push(new Pop_Words(words.charAt(i), i*10+word_offset_X, 0+word_offset_Y, 30, true))
    }else{
      if(i < 3){
        if(i == 2){
          sentenceAry.push(new Pop_Words(words.charAt(i), i*19+word_offset_X, 0+word_offset_Y, 30, false))
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), i*20+word_offset_X, 0+word_offset_Y, 30, false))
        }
      }

      if(i >= 3 && i < 14){
        if(i == 4){
          sentenceAry.push(new Pop_Words(words.charAt(i), sub-5+word_offset_X, 50+word_offset_Y, 30, false))
        }else{
          if(i == 5){
            sentenceAry.push(new Pop_Words(words.charAt(i), sub+3+word_offset_X, 50+word_offset_Y, 30, false))
            sub += 20
          }else{
            if(i == 12){
              sentenceAry.push(new Pop_Words(words.charAt(i), sub-3+word_offset_X, 50+word_offset_Y, 30, false))
              sub += 15
            }else{
              sentenceAry.push(new Pop_Words(words.charAt(i), sub+word_offset_X, 50+word_offset_Y, 30, false))
              sub += 20
            }
          }
        }
      }

      if(i >= 14){
        if(sub > 0 && i == 14){
          sub = 0
        }
        if(i == 15){
          sentenceAry.push(new Pop_Words(words.charAt(i), sub+3+word_offset_X, 100+word_offset_Y, 30, false))
          sub += 21
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), sub+word_offset_X, 100+word_offset_Y, 30, false))
          sub += 20
        }
      }
    }
  }
  cycleAry = []
  cycleAry.push(new Cycle(1500 * 4, Math.PI, 0, 3, false))
  cycleAry.push(new Cycle(1500 * 4, 0, Math.PI, 1, true))

  //starAry.push(new Cycle(1500,'yellow',0,Math.PI))

  starAry = []
  for(var i=0; i<100; i++){
    let bigR = 1
    let phi = Math.random() * Math.PI
    let smallR = Math.sqrt(Math.random()) * bigR
    let genX = smallR * Math.cos(phi)
    let genY = smallR * Math.sin(phi)
    starAry.push(new Stars(genX * canvas.width, genY * canvas.height + 900, 'green', 0, canvas.width/2-100, canvas.height/2+290))
  }

  dayAry = []
  dayAry.push(new Gradient(96, 213, 255))
  dayAry.push(new Gradient(78, 208, 255))
  dayAry.push(new Gradient(40, 202, 250))
  dayAry.push(new Gradient(0, 187, 255))

  nightAry = []
  nightAry.push(new Gradient(0, 12, 25))
  nightAry.push(new Gradient(0, 0, 0))
  nightAry.push(new Gradient(0, 0, 0))
  nightAry.push(new Gradient(0, 0, 0))

  cityAry = []
  cityAry.push(new City('./city1.png', 0))
  cityAry.push(new City('./city2.png', 40))
  cityAry.push(new City('./city3.png', 80))


  boxLayer1 = new Text_Background(-50+word_offset_X, -70+word_offset_Y, 'black', 300, 400,0)
  boxLayer2 = new Text_Background(-60+word_offset_X, -80+word_offset_Y, 'white', 350, 420,5)
  def_background = new Default_Background()
  drake = new Image();

  drake.src = './logo.png'
  smart = new Logo_Background(600,20,200,200)
}

setup()



var currentLtr = 0
var active = true


let mousex, mousey
c.canvas.addEventListener('mousemove', function(event){
   mousex = event.clientX - c.canvas.offsetLeft - 100,
   mousey = event.clientY - c.canvas.offsetTop - 100

   //document.getElementById('status').innerHTML = mousex +" | "+ mousey
})


function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0,0, innerWidth, innerHeight)

  c.save()
  c.translate(100,100)

  def_background.update()

  for(var i=0; i<cycleAry.length; i++){
    cycleAry[i].update()
    if(i==0){
      starAry.forEach((stars)=>{
        stars.update()
      })
    }
  }
  for(var i=cityAry.length-1; i>=0; i--){
    cityAry[i].update()
  }

  boxLayer2.update()
  boxLayer1.update()

  smart.update()

  c.drawImage(drake, canvas.width/2 - 250, 55, 300, 100)


  for(var i=0; i<sentenceAry.length; i++){
    sentenceAry[i].mouseX = mousex
    sentenceAry[i].mouseY = mousey

    if(sentenceAry[i].doResize == false && currentLtr == i){
      currentLtr = i+1
      if(currentLtr < sentenceAry.length){
        sentenceAry[currentLtr].doResize = true
      }
    }
    sentenceAry[i].update()
  }

  if(sentenceAry[sentenceAry.length-1].drawn == true){
    description.update()

  }



  c.restore()

}
animate()

},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61279" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/canvasHome.js"], null)
//# sourceMappingURL=/canvasHome.40cfd92c.js.map

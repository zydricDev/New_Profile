const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const staticWidth = window.innerWidth;

function onWindowResize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
}
window.addEventListener('resize', onWindowResize, false);

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
    this.frames = 350
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


    var xSub = this.x - this.pivotX
    var ySub = this.y - this.pivotY

    this.radians = 0.01745 * (2 * this.uniqueSpeed)

    var xSub2 = xSub * Math.cos(this.radians) - Math.sin(this.radians) * ySub
    var ySub2 = xSub * Math.sin(this.radians) + Math.cos(this.radians) * ySub

    this.x = xSub2 + this.pivotX
    this.y = ySub2 + this.pivotY




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

      c.drawImage(this.img, -100, this.y, staticWidth, 800)
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

class Mascot_Blink{
  constructor(x, y, height, width){
    this.x = x
    this.y = y
    this.height = height
    this.width = width

    this.blink = false
    this.timer = 0
    this.timelag = 0

    this.face1 = new Image();
    this.face1.src = './mascot1.png'

    this.face2 = new Image();
    this.face2.src = './mascot2.png'


  }
  draw(){
    if(this.timer == 1){ this.timelag = 50 + Math.random() * 400 }

    if(this.blink == false && this.timer < this.timelag){
      c.drawImage(this.face1, this.x, this.y, this.width, this.height)
    }
    if(this.timer >= this.timelag){
      this.blink = true
      this.timer = 0
    }

    if(this.blink == true){
      c.drawImage(this.face2, this.x, this.y, this.width, this.height)
      if(this.timer >= 10){
        this.blink = false
        this.timer = 0
      }
    }
    this.timer += 1

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

  desc = "Front-End & Web Application Developer"
  word_offset_X = 100
  word_offset_Y = 50

  description = new Fade_Words(desc, -10+word_offset_X, 150+word_offset_Y, 0, 15, false)

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


  logo_frame = new Logo_Background(600,-15,200,200)
  mascot = new Mascot_Blink(625, 10, 150,150)
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
  if(document.getElementById('hidden').innerHTML === "Completed"){
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

    logo_frame.update()
    mascot.update()


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

}
animate()

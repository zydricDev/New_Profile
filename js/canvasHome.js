const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Pop_Words {
  constructor(ltr, x, y, opac, isLast, size, doResize, drawn, mouseX, mouseY){
      this.ltr = ltr
      this.x = x
      this.y = y
      this.opac = opac

      this.isLast = isLast
      this.size = size

      this.doResize = doResize
      this.drawn = drawn

      this.mouseX = mouseX
      this.mouseY = mouseY
  }

  draw(){
    //&& this.opacDelay >= 0
    if(this.opac < 1){
      this.opac += 0.2
    }
    if(this.opac >= 1 && this.drawn == false){
      this.doResize = false
      this.drawn = true
    }


    c.globalAlpha = this.opac;

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

    if(this.opac < 1 && this.drawn == false){
      this.opac += 0.03
    }
    if(this.opac >= 1 && this.drawn == false){
      this.drawn = true
    }
    c.globalAlpha =  this.opac
    c.font = this.size+'px Bungee'
    c.fillText(this.ltr, this.x, this.y, 500)

  }

  update(){
    this.draw()
  }

}

class Star {
  constructor(x, y, radians, radius, color, size, opac, delay){
    this.x = x
    this.y = y
    this.radians = Math.round(radians, 5)
    this.radius = radius
    this.color = color
    this.size = size
    this.opac = opac
    this.delay = delay
  }
  draw(){
    c.globalAlpha = this.opac
    if(this.opac < 1){
      this.opac += 0.01
    }

    this.x = this.x + Math.cos(this.radians) * this.radius
    this.y = this.y + Math.sin(this.radians) * this.radius

    c.beginPath()
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    if(this.radians >= 62.83){
      this.radians = 0

    }
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)

    this.radians += 0.01745
    c.fillStyle = "black"
  }
  update(){
    if(this.delay <=0){
      this.draw()
    }else{
      this.delay -= 0.055
    }


  }
}
//

var sentenceAry = []
var words = "Hi,I'm Zydric,web developer"
var lastLtr = false
var sub = 0


let starAry



function setup(){
  for(var i=0; i<words.length; i++){
    if(i==words.length-1){
      lastLtr = true
    }
    if(i==0){
      sentenceAry.push(new Pop_Words(words.charAt(i), i*10, 0, 0, lastLtr, 30, true, false))
    }else{
      if(i < 3){
        if(i == 2){
          sentenceAry.push(new Pop_Words(words.charAt(i), i*19, 0, 0, lastLtr, 30, false, false))
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), i*20, 0, 0, lastLtr, 30, false, false))
        }
      }

      if(i >= 3 && i < 14){
        if(i == 4){
          sentenceAry.push(new Pop_Words(words.charAt(i), sub-5, 50, 0, lastLtr, 30, false, false))
        }else{
          if(i == 5){
            sentenceAry.push(new Pop_Words(words.charAt(i), sub+3, 50, 0, lastLtr, 30, false, false))
            sub += 20
          }else{
            if(i == 12){
              sentenceAry.push(new Pop_Words(words.charAt(i), sub-3, 50, 0, lastLtr, 30, false, false))
              sub += 15
            }else{
              sentenceAry.push(new Pop_Words(words.charAt(i), sub, 50, 0, lastLtr, 30, false, false))
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
          sentenceAry.push(new Pop_Words(words.charAt(i), sub+3, 100, 0, lastLtr, 30, false, false))
          sub += 21
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), sub, 100, 0, lastLtr, 30, false, false))
          sub += 20
        }
      }
    }
  }
  starAry = []
  starAry.push(new Star(innerWidth/2, innerHeight/2 - 400, 0, 8, 'red', 200, 0, 0))
  starAry.push(new Star(innerWidth/2, innerHeight/2 - 400, 0, 8, 'green', 200, 0, 10))


}

setup()

var desc = "Megamind was a great movie"
var description = new Fade_Words(desc, 0, 150, 0, 15, false)

var currentLtr = 0
//words.charAt()
var active = true

//
let mousex, mousey
c.canvas.addEventListener('mousemove', function(event){
   mousex = event.clientX - c.canvas.offsetLeft - 100,
   mousey = event.clientY - c.canvas.offsetTop - 100

  document.getElementById('status').innerHTML = mousex +" | "+ mousey
})


function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0,0, innerWidth, innerHeight)

  c.save()
  c.translate(100,100)

  if(sentenceAry[sentenceAry.length-1].drawn == true){
    starAry.forEach((stars)=>{
      stars.update()
    })
  }
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

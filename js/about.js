const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Diamond{
  constructor(distance, color){
    this.offset_X = 0
    this.offset_Y = 0

    this.distance = distance
    this.color = color
    this.centerX = canvas.width / 2 - 100 + this.offset_X
    this.centerY = canvas.height / 2 - 100 + this.offset_Y
    this.last = false
  }
  draw(){

    c.beginPath()
    c.fillStyle = this.color

    c.moveTo(this.centerX, this.centerY - this.distance)//top
    c.lineTo(this.centerX + this.distance, this.centerY)//right
    c.lineTo(this.centerX, this.centerY + this.distance)//bottom
    c.lineTo(this.centerX - this.distance, this.centerY)//left
    c.strokeStyle = "transparent";
    c.stroke()
    c.fill()
    c.closePath()

    this.distance += 1
    if(this.distance >= 5000){
      this.distance = 0
      this.last = true
    }


  }
  update(){
    this.draw()
  }

}

class Circle{
  constructor(distance, color){
    this.offset_X = 200
    this.offset_Y = 200

    this.distance = distance
    this.color = color
    this.centerX = canvas.width / 2 - 100 + this.offset_X
    this.centerY = canvas.height / 2 - 100 + this.offset_Y
    this.last = false
  }
  draw(){

    c.beginPath()
    c.fillStyle = this.color
    c.arc(this.centerX, this.centerY, this.distance, 0, 2 * Math.PI)
    c.stroke()
    c.fill()
    c.closePath()

    this.distance += 1
    if(this.distance >= 5000){
      this.distance = 0
      this.last = true
    }


  }
  update(){
    this.draw()
  }

}


class Boundary{
  draw(){
    c.beginPath();
    c.fillStyle = "black"
    c.moveTo(-100, canvas.height/2 - 100 );

    c.bezierCurveTo(
      canvas.width/2 - 100 - 200, canvas.height/2 - 200 ,
      canvas.width - 600, canvas.height/2,
      canvas.width - 100, canvas.height/2 - 100 );

    c.lineTo(canvas.width - 100 , -100);
    c.lineTo(-100, -100);
    c.fill()

    c.stroke();
    c.closePath();
  }
  update(){
    this.draw()
  }
}

function setup(){
  portalAry = []
  tracker = []

  for(let i=0; i<100; i++){
    if(i%2 == 0){
      portalAry[i] = new Diamond(i*50,'red')
    }else{ portalAry[i] = new Diamond(i*50,'black') }

  }
  for(let i=portalAry.length-1; i>=0; i--){
    tracker.push(i)
  }

  circleAry = []
  circleTrack = []

  for(let i=0; i<100; i++){
    if(i%2 == 0){
      circleAry[i] = new Circle(i*50,'red')
    }else{ circleAry[i] = new Circle(i*50,'black') }
  }
  for(let i=circleAry.length-1; i>=0; i--){
    circleTrack.push(i)
  }


  border = new Boundary()
}
setup()



function animate(){
  if(document.getElementById('hidden').innerHTML == "Completed"){
    requestAnimationFrame(animate)
    c.clearRect(0,0, innerWidth, innerHeight)
    c.save()
    c.translate(100,100)


    for(let i=0; i<circleTrack.length; i++){
      if(circleAry[circleTrack[i]].last == true){

        circleAry[circleTrack[i]].last = false
        circleTrack.push(circleTrack.shift())
      }
      circleAry[circleTrack[i]].update()

    }
    border.update()

    c.restore()
  }

}

animate()

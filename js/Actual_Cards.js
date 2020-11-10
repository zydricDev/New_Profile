import * as THREE from 'three';
import {cardContent, switchContent, closeContent} from './Actual_Cards_Content.js'
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'


var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
var counter = 0;
var tracker = [];
var card_light = [];
var static_lights = [];
var cardModels_p = [];
var cardModels = [];

var cardTextures = [
'./card_textures/card1.png',
'./card_textures/card2.png',
'./card_textures/card3.png',
'./card_textures/card4.png',
'./card_textures/card4.png'
];


function indicator(e){
  if(e){
    static_lights.forEach(light=>{
      if(light.type != 'DirectionalLight'){
        light.intensity = 0;
      }

    })

    if(e.path[1].id == 'left-btn' && counter == 0){
      card_switch_left();
      tracker.unshift(tracker.pop());
    }else if (counter == 0){
      card_switch_right();
      tracker.push(tracker.shift())
    }

  }
}


let left_btn = document.getElementById('left-btn');
let right_btn = document.getElementById('right-btn');


left_btn.addEventListener('click', indicator);
right_btn.addEventListener('click', indicator);


document.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

document.addEventListener( 'click', onDocumentMouseClick, false );
function onDocumentMouseClick(e){

  if(e.button == 0 &&
    INTERSECTED != null &&
    counter==0 &&
    INTERSECTED.geometry.type == "BoxGeometry" &&
    INTERSECTED.name == tracker[0]
  ){

    cardContent(INTERSECTED.name);
    let exit_btn = document.getElementById('card_exit');
    exit_btn.addEventListener('click',closeContent);
  }
  if(e.button == 0 &&
    INTERSECTED != null &&
    counter==0 &&
    INTERSECTED.geometry.type == "BoxGeometry" &&
    INTERSECTED.name != tracker[0] &&
    document.getElementById('card_exit') == null
  ){
    static_lights.forEach(light=>{
      if(light.type != 'DirectionalLight'){
        light.intensity = 0;
      }
    })
    let index = tracker.findIndex(element => element == INTERSECTED.name)
    for(let i=0;i<index;i++){
      card_switch_right();
      tracker.push(tracker.shift())
    }

  }


}


function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x00000 );
  scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight ,
    0.1,
    5000,
  );

  raycaster = new THREE.Raycaster();

  let location = document.getElementById('content');

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  location.appendChild( renderer.domElement );


  const plane_geometry = new THREE.PlaneBufferGeometry(4000,4000,8,8);
  const plane_material = new THREE.MeshPhongMaterial({color: 0x0f0f0f, side: THREE.DoubleSide});
  const plane = new THREE.Mesh(plane_geometry, plane_material);
  plane.receiveShadow = true;
  plane.rotation.x = Math.PI / 2;
  scene.add(plane);


  let card_quantity = 5
  let radians = 1.6;
  let loader = new GLTFLoader;
  var textureLoader = new THREE.TextureLoader();

  function loadModel(url){
    return new Promise(resolve =>{
      loader.load(url, resolve)
    });
  }
  for(let i=0; i<card_quantity; i++){
    cardModels_p.push(loadModel('card.glb').then(result => {

      cardModels.push(result.scene);

    }))
  }

  Promise.all([
    cardModels_p[0],
    cardModels_p[1],
    cardModels_p[2],
    cardModels_p[3],
    cardModels_p[4],

  ]).then(() => {
    for(let i=0; i<cardModels.length; i++){
      tracker.push(i+1)
      let xSub = 800;
      let ySub = 0;

      let xSub2 = xSub * Math.cos(radians) - Math.sin(radians) * ySub;
      let ySub2 = xSub * Math.sin(radians) + Math.cos(radians) * ySub;

      var map = textureLoader.load(cardTextures[i]);
      map.encoding = THREE.sRGBEncoding;
	    map.flipY = false;
      cardModels[i].children[0].material.map = map;

      cardModels[i].children[0].scale.set(150,1000,150)
      cardModels[i].children[0].rotation.set(Math.PI/2 , 0, 0)
      cardModels[i].children[0].position.set(xSub2,300,ySub2)
      cardModels[i].children[0].name = i+1;
      cardModels[i].children[0].receiveShadow = true;
      cardModels[i].children[0].castShadow = true;
      cardModels[i].children[0].geometry.type = 'BoxGeometry';

      radians += 2*Math.PI / card_quantity;

      card_light.push(new THREE.SpotLight( 0xffffff, 3, 1500, 50, 1));
      card_light[i].target = cardModels[i].children[0];

      card_light[i].position.set(
        xSub2,
        300 + 500,
        ySub2+1);

      scene.add( card_light[i] );
      scene.add(cardModels[i].children[0]);
    }

    static_lights.push(new THREE.SpotLight( 0xffffff, 10,2500));
    static_lights[0].name = "Static_Lights"

    static_lights[0].position.set(1000,500,scene.children[scene.children.findIndex((element) => element.name == tracker[0])].position.z+2100);
    static_lights[0].target = scene.children[scene.children.findIndex((element) => element.name == tracker[0])];
    static_lights[0].angle = 0.5;
    scene.add(static_lights[0]);


    static_lights.push(new THREE.SpotLight( 0xffffff, 10,2500));
    static_lights[1].name = "Static_Lights"
    static_lights[1].position.set(-1000,500,scene.children[scene.children.findIndex((element) => element.name == tracker[0])].position.z+2100);
    static_lights[1].target = scene.children[scene.children.findIndex((element) => element.name == tracker[0])];
    static_lights[1].angle = 0.5;
    scene.add(static_lights[1]);

    static_lights.push(new THREE.DirectionalLight(0x000000, 3));
    static_lights[2].name = "Static_Lights"
    static_lights[2].position.set(0,1000,-1000)
    static_lights[2].target = scene.children[scene.children.findIndex((element) => element.name == tracker[0])];
    scene.add(static_lights[2]);

  })

  camera.position.z = 1300
  camera.position.y += 380


}



function card_switch_left(){
  counter +=1;
  if(counter <= 72){
    requestAnimationFrame(card_switch_left)
    var radians = 2 * Math.PI / 360
    for(let i=0; i<scene.children.length; i++){
      if((scene.children[i].name || scene.children[i].type == "SpotLight") && scene.children[i].name !="Static_Lights"){

        var xSub = scene.children[i].position.x;
        var ySub = scene.children[i].position.z;

        var xSub2 = xSub * Math.cos(radians) - Math.sin(radians) * ySub
        var ySub2 = xSub * Math.sin(radians) + Math.cos(radians) * ySub

        scene.children[i].position.x = xSub2;
        scene.children[i].position.z = ySub2;
      }

    }
  }else{
    switchContent(tracker[0]);
    counter = 0;
    static_lights.forEach(light => {
      light.target = scene.children[scene.children.findIndex((element) => element.name == tracker[0])];
      if(light.type == 'SpotLight'){
        light.intensity = 10;
      }

    });
    return 0;
  }
}

function card_switch_right(){
  counter +=1;
  if(counter <= 72){
    requestAnimationFrame(card_switch_right)
    var radians = -2 * Math.PI / 360

    for(let i=0; i<scene.children.length; i++){
      if((scene.children[i].name || scene.children[i].type == "SpotLight") && scene.children[i].name !="Static_Lights"){
        var xSub = scene.children[i].position.x;
        var ySub = scene.children[i].position.z;

        var xSub2 = xSub * Math.cos(radians) - Math.sin(radians) * ySub
        var ySub2 = xSub * Math.sin(radians) + Math.cos(radians) * ySub

        scene.children[i].position.x = xSub2;
        scene.children[i].position.z = ySub2;
      }

    }
  }else{
    switchContent(tracker[0]);
    counter = 0;
    static_lights.forEach(light => {
      light.target = scene.children[scene.children.findIndex((element) => element.name == tracker[0])];
      if(light.type == 'SpotLight'){
        light.intensity = 10;
      }
    });
    return 0;
  }
}

function card_rotation(object){
  var radians = 2 * Math.PI / 360

  var xSub = object.position.x;
  var ySub = object.position.z;

  var xSub2 = xSub * Math.cos(radians) - Math.sin(radians) * ySub
  var ySub2 = xSub * Math.sin(radians) + Math.cos(radians) * ySub

  object.position.x = xSub2;
  object.position.y = 300;
  object.position.z = ySub2;

}

function render(){
  renderer.render(scene, camera);
  renderer.setClearColor (0xFFFFFF, 1);

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children, true );
  if (intersects.length > 0) {
    var targetDistance = intersects[0].distance;
    if (INTERSECTED != intersects[0].object){

      if (INTERSECTED && INTERSECTED.material.emissive){ INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex); }
      INTERSECTED = intersects[0].object;

      if(INTERSECTED.geometry.type == "BoxGeometry" && document.getElementById('card_exit') == null){

        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );

      }


    }
  }else{
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }


  for(let i=0; i<scene.children.length; i++){
    if(scene.children[i].name){
      scene.children[i].rotation.z -= 0.02;
    }


  }

}

function animate(){

  requestAnimationFrame( animate, renderer.domElement );
  render();





}

init();
animate();

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}
window.addEventListener('resize', onWindowResize, false);

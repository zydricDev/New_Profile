import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';


class Sweep extends Highway.Transition{
  in({from, to, done}){
    const tl= new TimelineLite();
    let myLogo = from.parentNode.parentNode.querySelectorAll("#myLogo");
    let loadScreen = to.querySelectorAll('#black-screen');


    tl.fromTo(myLogo, 1,{opacity: 1, transform: "translate(0px,0px)"},{opacity: 1, transform: "translate(800px,350px)"})
    .fromTo(to, 1,{left: '-100%'},{left: '0%'},'-=1')
    .fromTo(loadScreen, 1,{opacity: 1, display: "block", backgroundColor: 'black', left:'0%'},{opacity: 1, display: "block", backgroundColor: 'black', left:'100%', onComplete: function(){
      document.getElementById('black-screen').remove();
    }})
    .fromTo(to, 1,{backgroundColor : 'white'},{backgroundColor : 'white'},'-=1')

    //.fromTo(myLogo, 1,{width: 50, height: 50},{width: 100, height: 100})

    .fromTo(myLogo, 0.5,{transform: "translate(800px,350px)"},{transform: "translate(1600px,350px)"}, '-=1')


    .fromTo(myLogo, 0.5, {opacity: 0, transform: "translate(0px,0px)"},{opacity: 1, transform: "translate(0px,0px)", onComplete: function(){
      done();
    }}); //.fromTo(to.children[0], 2, {opacity: 0}, {opacity: 1})
  }



  out({from,done}){

    done();
  }
}


export default Sweep;

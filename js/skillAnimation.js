import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

class Animation_Skill extends Highway.Renderer{

    onEnterCompleted(){
      const tl= new TimelineLite();
      let script = document.createElement('script');
      let view = document.getElementById('switch_view');

      let canvas = document.getElementById('canvas_skill');
      canvas.style.opacity = 0
      script.setAttribute('src', '/cube.1c2ec62a.js');
      view.appendChild(script);
      tl.fromTo(canvas, 0.5, {opacity: 0},{opacity: 1});
    }




    onLeaveCompleted(){

      if(document.getElementById('switch_view') !==null){
        const tl= new TimelineLite();
        var element = document.getElementById('switch_view')
        tl.fromTo(element.children[0], 1, {opacity: 1},{opacity: 1, onComplete: function(){
          element.remove();
        }});
      }


    }
}

export default Animation_Skill;

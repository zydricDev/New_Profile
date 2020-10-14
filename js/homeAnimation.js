import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

class Animation_Home extends Highway.Renderer{

    onEnter(){
      const tl= new TimelineLite();

      let script = document.createElement('script');
      let view = document.getElementById('switch_view');
      script.setAttribute('src', '/canvasHome.40cfd92c.js');

      view.appendChild(script);

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

export default Animation_Home;

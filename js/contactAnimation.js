import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';


//this
class Animation_Contact extends Highway.Renderer{

    onEnter(){
      if(document.getElementById('loaded_canvas') == null){
        let status = document.getElementById('hidden');
        let script = document.createElement('script');
        let view = document.getElementById('switch_view');
        script.setAttribute('src', '/Actual_Cards.f548dcc4.js');
        view.appendChild(script);
      }


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

export default Animation_Contact;

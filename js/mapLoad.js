import Highway from '@dogstudio/highway';
import {TimelineLite} from 'gsap';

class MapLoad extends Highway.Renderer{

    onEnter(){
      let script = document.createElement('script');
      let view = document.getElementById('content');
      let key = "AIzaSyCxz3AG8xxfMuXMbR5ND5zL0Y8StCtNYNg";
      script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+key+'&callback=initMap');
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

export default MapLoad;

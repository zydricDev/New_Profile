import Highway from '@dogstudio/highway';
import Sweep from './transition';
import Setup from './startup';


const H = new Highway.Core({
  renderers:{
    index: Setup,
    about: Setup,
  },
  transitions:{
    default: Sweep,
  }

});

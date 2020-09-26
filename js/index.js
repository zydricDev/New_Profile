import Highway from '@dogstudio/highway';
import Sweep from './transition';
import Setup from './startup';
import Animation_Home from './homeAnimation';

const H = new Highway.Core({
  renderers:{ // Only one renderer at a time...

    home: Animation_Home,
    about: Setup,
  },
  transitions:{
    default: Sweep,
  }

});

import Highway from '@dogstudio/highway';
import Sweep from './transition';
import Setup from './startup';
import Animation_Home from './homeAnimation';
import Animation_Skill from './skillAnimation';
import MapLoad from './mapLoad';

const H = new Highway.Core({
  renderers:{ // Only one renderer at a time...

    home: Animation_Home,
    about: Setup,
    skill: Animation_Skill,
    contact: MapLoad,
  },
  transitions:{
    default: Sweep,
  }

});

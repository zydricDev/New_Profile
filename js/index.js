import Highway from '@dogstudio/highway';
import Sweep from './transition';
import Setup from './startup';

import Animation_Home from './homeAnimation';
import Animation_About from './aboutAnimation';
import Animation_Work from './workAnimation';


import Home_Transition from './homeTransition';
import About_Transition from './aboutTransition';
import Work_Transition from './workTransition';

const H = new Highway.Core({
  renderers:{ // Only one renderer at a time...

    home: Animation_Home,
    about: Animation_About,
    work: Animation_Work,

  },
  transitions:{
    default: Sweep,
    home: Home_Transition,
    about: About_Transition,
    work: Work_Transition,
  }

});

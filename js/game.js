import Intro from "./modules/screens/Intro.js";

const canvasDom = document.getElementById('pitch');
const introScreen = new Intro({ canvas: canvasDom });
introScreen.initialize();
introScreen.start();

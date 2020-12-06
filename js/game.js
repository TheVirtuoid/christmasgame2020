import Intro from "./modules/screens/Intro.js";
import Play from "./modules/screens/Play.js";

import Renderer from "./modules/game/Renderer.js";

const canvas = document.getElementById('pitch');
const ctx = canvas.getContext('2d');
const height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
const width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
const sizer = document.getElementById('sizer');
const font = "Courier New, monospace";
const renderer = new Renderer({ canvas, ctx, width, height, sizer, font });

canvas.setAttribute('height', `${height}`);
canvas.setAttribute('width', `${width}`);
ctx.textBaseline = "top";
ctx.fillStyle = "yellow";

/*
const introScreen = new Intro({ renderer });
introScreen.start();
*/
const playScreen = new Play({ renderer });
playScreen.start();

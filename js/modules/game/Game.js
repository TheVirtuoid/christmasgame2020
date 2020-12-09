import Intro from "./../screens/Intro.js";
import Play from "../screens/Play.js";
import GameOver from "../screens/GameOver.js";
import Renderer from "./Renderer.js";

export default class Game {
	constructor () {
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

		this.renderer = renderer;
		this.currentScreen = null;
		this.screens = {
			"intro": new Intro({ game: this }),
			"play": new Play({ game: this }),
			"gameover": new GameOver({ game: this })
		};

	}

	switchScreens(newScreen) {
		if (this.currentScreen !== null) {
			this.currentScreen.stop();
		}
		this.currentScreen = this.screens[newScreen];
		this.currentScreen.start();
	}
}
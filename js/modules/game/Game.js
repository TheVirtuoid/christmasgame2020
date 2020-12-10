import Intro from "./../screens/Intro.js";
import Play from "../screens/Play.js";
import GameOver from "../screens/GameOver.js";
import Renderer from "./Renderer.js";
import Scoreboard from "../components/Scoreboard.js";
import HighScores from "./HighScores.js";
import HighScoreScreen from "../screens/HighScoreScreen.js";
import {borders, fontSizes} from "./params.js";

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

		const sTop = borders.top;
		const sHeight = fontSizes[18].height + fontSizes[20].height;
		const sWidth = renderer.width - borders.left - borders.right;
		const left = borders.left;

		this.scoreboard = new Scoreboard({ renderer, width: sWidth, left, top: sTop, height: sHeight });
		this.highScores = new HighScores();
		this.renderer = renderer;
		this.currentScreen = null;
		const highScore = this.highScores.scores[0];
		highScore.score = 24601;
		highScore.initials = 'MPS';
		this.scoreboard.setHighScore(highScore.score, highScore.initials);
		this.screens = {
			"intro": new Intro({ game: this }),
			"play": new Play({ game: this }),
			"gameover": new GameOver({ game: this }),
			"highscore": new HighScoreScreen({ game: this })
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

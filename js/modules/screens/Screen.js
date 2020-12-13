import Playground from "../components/Playground.js";
import { borders, fontSizes } from "../game/params.js";

export default class Screen {
	constructor(args) {
		const { game } = args;
		this.renderer = game.renderer;
		this.game = game;
		const width = this.renderer.width - borders.left - borders.right;
		const left = borders.left;
		const sTop = this.game.scoreboard.top;
		const sHeight = this.game.scoreboard.height;
		const top = sHeight + sTop;
		const height = this.renderer.height - borders.bottom - sHeight - borders.top;
		this.scoreboard = this.game.scoreboard;
		this.playground = new Playground({ renderer: this.renderer, width, left, top, height });
	}

	start() {
		this.scoreboard.draw();
		this.playground.draw();
	}

	stop() {
		this.playground.clear();
	}

	setHighScore(value, initials) {
		this.scoreboard.setHighScore(value, initials);
	}

}

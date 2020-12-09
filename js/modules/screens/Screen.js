import Playground from "../components/Playground.js";
import Scoreboard from "../components/Scoreboard.js";
import { borders, fontSizes } from "../game/params.js";

export default class Screen {
	constructor(args) {
		const { game } = args;
		this.renderer = game.renderer;
		this.game = game;
		const width = this.renderer.width - borders.left - borders.right;
		const left = borders.left;
		const sTop = borders.top;
		const sHeight = fontSizes[18].height + fontSizes[20].height;
		const pTop = sHeight + sTop;
		const pHeight = this.renderer.height - borders.bottom - sHeight - borders.top;
		this.playground = new Playground({ renderer: this.renderer, width, left, top: pTop, height: pHeight });
		this.scoreboard = new Scoreboard({ renderer: this.renderer, width, left, top: sTop, height: sHeight });
	}

	addScore(value) {
		this.scoreboard.addScore(value);
	}

	subtractHealth(value) {
		this.scoreboard.subtractHealth(value);
	}

}

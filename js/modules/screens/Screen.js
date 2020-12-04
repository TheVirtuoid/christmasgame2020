import Playground from "./../components/Playground.js";
import Scoreboard from "./../components/Scoreboard.js";

export default class Screen {
	constructor(args) {
		const { renderer } = args;
		this.renderer = renderer;
		this.playground = new Playground({ renderer });
		this.scoreBoard = new Scoreboard({ renderer });
	}

	drawScoreboard () {
		this.scoreBoard.draw();
	}

	drawPlayground () {
		this.playground.draw();
	}

	addScore(value) {
		this.scoreBoard.addScore(value);
	}

}

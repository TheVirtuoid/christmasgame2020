import { fontSizes } from "../game/params.js";
import Text from "./Text.js";

export default class HighScore {
	/**
	 * Constructr the HighScore section the Scoreboard
	 * @param {Object} args - key/value collection of arguments
	 * @param {Number} args.score - initial score to display
	 * @param {String} args.initials - initial 'initials' to display
	 */
	constructor(args) {
		const { renderer, top, left, height, width, score = 0, initials = 'AAA' } = args;

		this.renderer = renderer;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;

		this.score = score;
		this.initials = initials;

		const color = "yellow";
		const font = "Courier New, monospace";
		let size = 18;
		let tTop = this.top;
		let tHeight = fontSizes[size].height;
		this.theText = new Text({ renderer, top: tTop, left, width, height: tHeight, color, size, font, text: 'HI SCORE' });
		size = 20;
		tTop += tHeight;
		tHeight = fontSizes[size].height;
		this.theScore = new Text({ renderer, top: tTop, left, width, height: tHeight, color, size, font, text: `${this.score} ${this.initials}` });
	}

	/**
	 * Draw the High Score section of the Scoreboard
	 */
	draw() {
		this.theText.erase();
		this.theText.draw();
		this.theScore.text = `${this.score} ${this.initials}`;
		this.theScore.erase();
		this.theScore.draw();
	}
}

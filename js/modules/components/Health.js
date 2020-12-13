import { fontSizes } from "../game/params.js";
import Text from "./Text.js";

export default class Health {
	/**
	 * Construct the Health section of the Scoreboard
	 * @param {Object} args - key/value collection of arguments.
	 */
	constructor(args) {
		const { renderer, top, left, height, width } = args;
		this.score = 100;
		this.renderer = renderer;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;

		const color = "yellow";
		const font = "Courier New, monospace";
		let size = 18;
		let tTop = this.top;
		let tHeight = fontSizes[size].height;
		this.theText = new Text({ renderer, top: tTop, left, width, height: tHeight, color, size, font, text: 'HEALTH' });
		size = 20;
		tTop += tHeight;
		tHeight = fontSizes[size].height;
		this.theScore = new Text({ renderer, top: tTop, left, width, height: tHeight, color, size, font, text: this.score.toString() });
	}

	/**
	 * Draw the text and the Score
	 */
	draw() {
		this.theText.erase();
		this.theScore.erase();
		this.theText.draw();
		this.theScore.draw();
	}

	/**
	 * Add to the score. The score is redrawn.
	 * @param {Number} score - amount to add to the score.
	 */
	add(score) {
		this.theScore.erase();
		this.score += score;
		this.theScore.text = this.score.toString();
		this.theScore.draw();
	}

	/**
	 * Reset the score. The score is redrawn.
	 */
	reset() {
		this.theScore.erase();
		this.score = 100;
		this.theScore.text = this.score.toString();
		this.theScore.draw();
	}
}

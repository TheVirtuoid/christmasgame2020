import Text from "./Text.js";
import { fontSizes } from "../game/params.js";

export default class ScoreCard {
	/**
	 * Construct a new ScoreCard (current game score)
	 * @param {Object} args - key/value collection of arguments.
	 * @param {Renderer} args.renderer - the Renderer instance
	 * @param {Number} args.top - upper left corner for start of scorecard Y-axis)
	 * @param {Number} args.left - upper left corner for start of scorecard (X-axis)
	 * @param {Number} args.width - width of scorecard
	 * @param {Number} args.height - height of scorecard
	 */
	constructor(args) {
		const { renderer, top, left, width, height } = args;
		this.renderer = renderer;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;

		this.score = 0;

		const color = "yellow";
		const font = "Courier New, monospace";
		let size = 18;
		let tTop = this.top;
		let tHeight = fontSizes[size].height;
		this.theText = new Text({ renderer, top: tTop, left, width, height: tHeight, color, size, font, text: 'SCORE' });
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
		this.score = 0 ;
		this.theScore.text = this.score.toString();
		this.theScore.draw();
	}
}

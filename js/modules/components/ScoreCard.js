import Text from "./Text.js";
import { fontSizes } from "../game/params.js";

export default class ScoreCard {
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

	draw() {
		this.theText.draw();
		this.theScore.draw();
	}

	add(score) {
		this.theScore.erase();
		this.score += score;
		this.theScore.text = this.score.toString();
		this.theScore.draw();
	}

	reset() {
		this.theScore.erase();
		this.score = 0 ;
		this.theScore.text = this.score.toString();
		this.theScore.draw();
	}
}

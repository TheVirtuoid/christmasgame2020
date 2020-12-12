import { fontSizes } from "../game/params.js";
import Text from "./Text.js";


export default class HighScore {
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

	draw() {
		this.theText.draw();
		this.theScore.draw();
	}
}

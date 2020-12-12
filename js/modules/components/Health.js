import { fontSizes } from "../game/params.js";
import Text from "./Text.js";

export default class Health {
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

	draw() {
		this.theText.draw();
		this.theScore.draw();
	}

	add(score) {
		this.score += score;
		this.theScore.draw();
	}

	reset() {
		this.score = 100;
		this.theScore.draw();
	}
}

import {borders, fontSizes} from "../game/params.js";

export default class ScoreBoardComponent {
	constructor(args) {
		const { renderer, top, left, width, height, size, color, font, text } = args;
		this.renderer = renderer;
		this.top = top;
		this.left = left;
		this.width = width;
		this.height = height;
		this.size = size;
		this.color = color;
		this.font = font;
		this.text = text;
	}
	erase() {
		this.renderer.ctx.fillStyle = "black";
		this.renderer.ctx.fillRect(this.left, this.top, this.width, this.height);
	}

	draw(text = "") {
		text = text ? text : this.text;
		this.erase();
		this.pos = {
			x: this.left + (this.width - text.length * fontSizes[this.size].width) / 2,
			y: this.top
		};
		this.renderer.draw({
			text: text,
			size: this.size,
			color: this.color,
			font: this.font,
			pos: this.pos
		});
	}


}

export default class Component {
	constructor(args) {
		const { renderer, top, width, left, height } = args;
		this.renderer = renderer;
		this.pos = { x: 0, y: 0};
		this.color = "white";
		this.font = "monospace";
		this.size = "24px";
		this.top = top;
		this.width = width;
		this.left = left;
		this.height = height;
	}

	draw(text, maxLength = 0) {
		this.renderer.draw({
			text: text,
			size: this.size,
			color: this.color,
			font: this.font,
			pos: this.pos,
			maxLength: maxLength
		})
	}

	draw2(text, maxLength = 0) {
		this.renderer.draw({
			text: text,
			size: this.size,
			color: this.color,
			font: this.font,
			pos: this.pos,
			maxLength: maxLength
		})
	}
}

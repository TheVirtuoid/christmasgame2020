export default class Component {
	constructor(args) {
		const { renderer } = args;
		this.renderer = renderer;
		this.pos = { x: 0, y: 0};
		this.color = "white";
		this.font = "monospace";
		this.size = "24px";
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
}

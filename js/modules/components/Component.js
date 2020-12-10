export default class Component {
	constructor(args) {
		const { renderer, top, width, left, height, size, color = "white", font = "Courier New, monospace", justify = "center" } = args;
		this.renderer = renderer;
		this.pos = { x: 0, y: 0};
		this.color = color;
		this.font = font;
		this.size = size;
		this.top = top;
		this.width = width;
		this.left = left;
		this.height = height;
		this.justify = justify;
		this.image = null;
	}

	draw(text, top = this.top, left = this.left) {
		const textLength = text.length * this.renderer.fontSizes[this.size].width;
		// const additive = this.justify === "left" ? 0 : this.justify === "center" ? (this.width - textLength) / 2 : 0;
		const additive = justify(textLength, this.width, this.justify);
		const pos = {
			x: left + additive,
			y: top
		}
		this.renderer.draw({
			text: text,
			size: this.size,
			color: this.color,
			font: this.font,
			pos: pos,
			maxLength: textLength
		});

		function justify(textLength, width, type = "center") {
			if (type === 'left') {
				return 0;
			} else if (type === 'center') {
				return (width - textLength) / 2;
			} else if (type === 'right') {
				return width - textLength
			} else {
				return 0;
			}
		}
	}

	drawFill(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.renderer.drawFill({
			color: this.color,
			pos: { left, top, width: this.width, height: this.height }
		});
	}

	drawImage(top, left) {
		top = top ? top : this.top;
		left = left ? left: this.left;
		this.renderer.drawImage({
			image: this.image,
			pos: { left, top, width: this.width, height: this.height }
		})
	}


	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.renderer.erase({ top, left, width: this.width, height: this.height });
	}

}

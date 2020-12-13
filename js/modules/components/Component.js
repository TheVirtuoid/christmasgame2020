import { fontSizes } from "../game/params.js";

export default class Component {
	constructor(args) {
		const { game, renderer, top, width, left, height, size, color = "white", font = "Courier New, monospace", justify = "center", image = null, sound = null, noDraw = false } = args;
		this.game = game;
		this.renderer = renderer;
		this.pos = { x: 0, y: 0};
		this.color = color;
		this.font = font;
		this.size = size;
		this.top = Math.floor(top);
		this.width = Math.floor(width);
		this.left = Math.floor(left);
		this.height = Math.floor(height);
		this.justify = justify;
		this.image = image;
		this.sound = sound;
		this.noDraw = noDraw;
	}

	draw(text, top = this.top, left = this.left) {
		if (this.noDraw) {
			return null;
		}
		const textLength = text.length * fontSizes[this.size].width;
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
		return { x1: pos.x, y1: pos.y, x2: fontSizes[this.size].width * text.length + pos.x, y2: fontSizes[this.size].height + pos.y };

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
		if (this.noDraw) {
			return null;
		}
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.renderer.drawFill({
			color: this.color,
			pos: { left, top, width: this.width, height: this.height }
		});
	}

	drawImage(top, left) {
		if (this.noDraw) {
			return null;
		}
		top = top ? top : this.top;
		left = left ? left: this.left;
		this.renderer.drawImage({
			image: this.image,
			pos: { left, top, width: this.width, height: this.height }
		})
		return { x1: left, y1: top, x2: left + this.width, y2: top + this.height };
	}


	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.renderer.erase({ top, left, width: this.width, height: this.height });
	}

}

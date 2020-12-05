export default class Renderer {
	constructor(args) {
		const { canvas, ctx, height, width, sizer, font } = args;
		this.canvas = canvas;
		this.ctx = ctx;
		this.height = height;
		this.width = width;
		this.sizer = sizer;
		this.font = font;
		this.fontSizes = [];
		this.initSizer();
	}

	draw(args) {
		const { text, size, color, font, pos, maxLength } = args;
		this.ctx.fillStyle = color;
		this.ctx.font = `${size}px ${font}`;
		if (maxLength !== 0) {
			this.ctx.fillText(text, pos.x, pos.y, maxLength);
		} else {
			this.ctx.fillText(text, pos.x, pos.y);
		}
	}

	erase(args) {
		const { top, left, width, height } = args;
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(left, top, width, height);
	}

	initSizer() {
		for(let i = 8; i <= 64; i++) {
			const span = document.createElement('span');
			span.style.fontFamily = this.font;
			span.style.fontSize = `${i}px`;
			span.textContent = "M";
			this.sizer.appendChild(span);
			this.fontSizes[i] = ({ height: span.offsetHeight, width: span.offsetWidth });
		}
		console.log(this.fontSizes);
	}
}

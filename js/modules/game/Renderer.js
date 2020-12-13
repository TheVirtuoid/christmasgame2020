export default class Renderer {
	/**
	 * Construct a new Renderer, the base routines for drawing directly onto the canvas.
	 * @param {Object} args - the key/value collection of properties
	 * @param {HTMLCanvasElement} args.canvas - pointer to the HTML <canvas> element
	 * @param {RenderingContext} args.ctx - The rendering context
	 * @param {Number} args.width - width of the space in which to draw the icon or text
	 * @param {Number} args.height - height of the space in which to draw the icon or text
	 * @param {HTMLElement} args.sizer - Pointer to HTML element used in initSizer (see initSizer)
	 * @param {String} args.font - default CSS font string declaration
	 */
	constructor(args) {
		const { canvas, ctx, height, width, sizer, font } = args;
		this.canvas = canvas;
		this.ctx = ctx;
		this.height = height;
		this.width = width;
		this.sizer = sizer;
		this.font = font;
		this.fontSizes = [];
		// this.initSizer();
	}

	/**
	 * Draw text
	 * @param {Object} args - key/value collection of properties
	 * @param {String} args.text - text to draw
	 * @param {Number} args.size - font size of the text
	 * @param {String} args.color - CSS color declaration
	 * @param {String} args.font - CSS font declaration
	 * @param {Object} args.pos - {x, y} upper-left corner for the text
	 * @param {Number} args.maxLength - Maximum length to print the text. If text does not fit, ctx.fillText will automatically adjust
	 */
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

	/**
	 * Draws a rectangle
	 * @param {Object} args - key/value collection of properties
	 * @param {String} args.color - CSS color declaration
	 * @param {Object} args.pos - {top, left, width, height} coordinate description for the rectangle
	 */
	drawFill(args) {
		const { color, pos } = args;
		this.ctx.fillStyle = color;
		this.ctx.fillRect(pos.left, pos.top, pos.width, pos.height)
	}

	/**
	 * Draws an image
	 * @param {Object} args - key/value collection of properties
	 * @param {Image} args.image - image to display
	 * @param {Object} args.pos - {top,let,width,height} coordinate description for the image
	 */
	drawImage(args) {
		const { image, pos } = args;
		this.ctx.drawImage(image, pos.left, pos.top, pos.width, pos.height);
	}

	/**
	 * Erases a rectangle
	 * @param {Object} args - key/value collection of properties
	 * @param {Number} args.top - upper left corner of rectangle (Y-axis)
	 * @param {Number} args.left - upper left corner of rectangle (X-axis)
	 * @param {Number} args.width - width of rectangle
	 * @param {Number} args.height - height of rectangle
	 * @
	 */
	erase(args) {
		const { top, left, width, height } = args;
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(left, top, width, height);
	}

	/**
	 * Support/debug routine to display font size widths/heights from 8 to 64
	 *
	 * DO NOT USE IN PRODUCTION! This initiator for this code is located in the constructor of this
	 * class and is commented out. This will insert a host of <span> elements into the given HTMLElement
	 * declared by this.sizer. It will then display into the Debug Console an array of fontsize that
	 * will allow you to pick and choose font sizes to use for the app.
	 *
	 * These font sizes are to be placed in the params.js file
	 */
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

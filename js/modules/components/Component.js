import { fontSizes } from "../game/params.js";

export default class Component {
	/**
	 * Base class for rendering icons, text, etc.
	 * @param {Object} args - key/value collection of properties
	 *
	 * @param {Game} args.game - Game instance
	 * @param {Renderer} args.renderer - Renderer instance
	 * @param {String} args.color - CSS color definition. Used as text color or color of box if no image is specified
	 * @param {String} args.font - CSS font definition. Use for text
	 * @param {Number} args.size - Font size in pixels
	 * @param {Number} args.top - Top point of upper-left corner for the icon (Y axis)
	 * @param {Number} args.left - Left point of upper-left corner for the icon (X axis)
	 * @param {Number} args.width - width of the space in which to draw the icon or text
	 * @param {Number} args.height - height of the space in which to draw the icon or text
	 * @param {String} args.justify - Justification of the string (left, center, right)
	 * @param {Image} args.image - Image associated with the icon.
	 * @param {Audio} args.sound - Sound associated with the icon.
	 */
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

	/**
	 * Draws test into the playground
	 * @param {String} text - the text to display
	 * @param {Number} top - upper left corner from which to draw (Y axis)
	 * @param {Number} left - upper left corner from which to draw (X axis)
	 * @returns {null|{y1: number, x1: *, y2: *, x2: *}} - null if no drawing occurred, otherwise the (x1,y1)-(x2.y2) coordinates that contain the text.
	 */
	draw(text, top, left) {
		if (this.noDraw) {
			return null;
		}
		top = top ? top : this.top;
		left = left ? left : this.left;
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

	/**
	 * Fills in a section of the playground with the current color
	 * @param {Number} top - the upper-left corner from which to draw (Y axis)
	 * @param {Number} left - the upper-left corner from which to draw (X axis)
	 * @returns {null|undefined} - null of no drawing took place, otherwise undefined
	 */
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

	/**
	 * Draws an image to the playground
	 * @param {Number} top - the upper-left corner from which to draw (Y axis)
	 * @param {Number} left - the upper-left corner from which to draw (X axis)
	 * @returns {{y1: (*|number), x1: (*|number), y2: *, x2: *}|null} - returns null if no drawing took place, otherwise {top,left,width,height} of the icon drawn.
	 */
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

	/**
	 * Erase the icon. Uses the current width/height of the component.
	 * @param {Number} top - the upper-left corner from which to draw (Y axis)
	 * @param {Number} left - the upper-left corner from which to draw (X axis)
	 */
	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.renderer.erase({ top, left, width: this.width, height: this.height });
	}

}

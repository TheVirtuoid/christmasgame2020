import Component from "./Component.js";

export default class Button extends Component {
	/**
	 * Constructs a new Button. Used when click events are needed to be captured on the text/icon
	 * @param {Object} args - key/value collection of arguments.
	 * @param {Object} args.action - actions to take upon an event occurring
	 * @param {String} args.text - text to display if no icon (image) is specified
	 * @param {Image} args.image - image to display. Takes precedence over args.text
	 */
	constructor(args) {
		super(args);
		const { action = null, text } = args;
		this.text = text;
		this.action = action;
		if (this.action) {
			action.check = true;
		}
	}

	/**
	 * Erases the text/icon. Will also remove the event from the event queue.
	 * @param {Number} top - upper left corner to begin erase (Y axis)
	 * @param {Number} left - upper left corner to begin erase (X axis)
	 */
	erase(top, left) {
		this.game.events.remove(this.action);
		super.erase(top, left);
	}

	/**
	 * Draw the text or the image
	 */
	draw() {
		if (this.image) {
			this.action.clickZone = super.drawImage(this.top, this.left);
			this.game.events.add(this.action);
		} else {
			this.action.clickZone = super.draw(this.text, this.top, this.left);
			this.game.events.add(this.action);
		}
	}
}

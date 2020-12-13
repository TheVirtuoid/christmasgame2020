import Button from "../Button.js";

export default class Down extends Button {
	/**
	 * Constructs a new Down button (for High Score Entry)
	 * @param {Object} args - key/value collection of arguments
	 */
	constructor(args) {
		super(args);
		this.image.height = 30;
		this.image.width = 30;
		this.height = 30;
		this.width = 30;
	}
}

import Component from "./Component.js";

export default class Text extends Component {
	/**
	 * Constructs a new Text only component
	 * @param {Object} args - key/value collection of properities
	 * @param {String} args.text - text to display
	 */
	constructor(args) {
		super(args);
		const { text = "" } = args;
		this.text = text;
	}

	/**
	 * Draws the text
	 */
	draw() {
		super.draw(this.text, this.top, this.left);
	}

	/**
	 * Erases the text
	 */
	erase() {
		super.erase(this.top, this.left);
	}
}

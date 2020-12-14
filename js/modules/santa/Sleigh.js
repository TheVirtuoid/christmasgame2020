import Component from "./../components/Component.js";

export default class Sleigh extends Component {
	/**
	 * Construct a sleigh
	 * @param {Object} args - key/value collection of properties
	 */
	constructor(args) {
		super(args);
		this.image.height = this.height;
		this.image.width = this.width;
		this.color = "red";
	}

	/**
	 * Draw the sleigh
	 * @param {Number} top - upper left corner of object (Y-axis)
	 * @param {Number} left - upper left corner of object (X-axis)
	 */
	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.drawImage(top, left);
	}

	/**
	 * Erase the sleigh
	 * @param {Number} top - upper left corner of object (Y-axis)
	 * @param {Number} left - upper left corner of object (X-axis)
	 */
	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}

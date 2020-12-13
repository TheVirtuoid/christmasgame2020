import Box from "./../game/Box.js";

export default class Balloon extends Box {
	/**
	 * Construct a new Balloon
	 * @param args
	 */
	constructor(args) {
		super(args);
		this.color = "LightSalmon";
		this.name = "Balloon";
		this.image.height = 60;
		this.image.width = 34;
		this.height = 60;
		this.width = 34;
	}

	/**
	 * Sets the damage upon a hit (4 - 8)
	 * @returns {number}
	 */
	get damage() {
		return Math.ceil(Math.random() * 5) + 3;
	}

}

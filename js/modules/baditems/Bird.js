import Box from "./../game/Box.js";

export default class Bird extends Box {
	/**
	 * Constructs a new Bird
	 * @param args
	 */
	constructor(args) {
		super(args);
		this.color = "firebrick";
		this.name = "Bird";
		this.image.height = 30;
		this.image.width = 64;
		this.height = 30;
		this.width = 64;
	}

	/**
	 * Sets the damage upon a hit (1 - 10)
	 * @returns {number}
	 */
	get damage() {
		return Math.ceil(Math.random() * 10);
	}

}

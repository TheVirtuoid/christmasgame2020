import Box from "./../game/Box.js";

export default class Meteor extends Box {
	/**
	 * Constructs a new Meteor Icon
	 * @param args
	 */
	constructor(args) {
		super(args);
		this.color = "crimson";
		this.name = "Meteor";
		this.image.height = 50;
		this.image.width = 61;
		this.height = 50;
		this.width = 61;
	}

	/**
	 * Sets the damage upon a hit (1 - 10)
	 * @returns {number}
	 */
	get damage() {
		return Math.ceil(Math.random() * 10);
	}

}

import Box from "./../game/Box.js";

export default class Airplane extends Box {
	/**
	 * Constructs a new Airplane icon
	 * @param args Object Key/Value collection of attributes for the Airplane
	 */
	constructor(args) {
		super(args);
		this.color = "darkred";
		this.name = "Airplane";
		this.image.height = 50;
		this.image.width = 50;
		this.height = 50;
		this.width = 50;
	}

	/**
	 * Gets randomized damage when a hit occurs (11 - 30)
	 * @returns {number} Number
	 */
	get damage() {
		return Math.ceil(Math.random() * 20) + 10;
	}

}

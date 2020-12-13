import Box from "./../game/Box.js";

export default class Ufo extends Box {
	/**
	 * Constructs a new UFO icon
	 * @param args
	 */
	constructor(args) {
		super(args);
		this.color = "LightCoral";
		this.name = "UFO";
		this.image.height = 19;
		this.image.width = 30;
		this.height = 19;
		this.width = 30;
	}

	/**
	 * Sets the damage upon a hit (16 - 25)
	 * @returns {number}
	 */
	get damage() {
		return Math.ceil(Math.random() * 10) + 15;
	}

}

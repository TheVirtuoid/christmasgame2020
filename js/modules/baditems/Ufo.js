import Box from "./../game/Box.js";

export default class Ufo extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.floor(Math.random() * 10) + 15;
	}
}

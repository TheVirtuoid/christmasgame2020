import Box from "./../game/Box.js";

export default class Bird extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.floor(Math.random() * 10);
	}
}

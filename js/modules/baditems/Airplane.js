import Box from "./../game/Box.js";

export default class Airplane extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.floor(Math.random() * 20) + 10;
	}
}

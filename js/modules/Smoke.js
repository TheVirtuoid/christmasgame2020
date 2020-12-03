import Box from "./Box.js";

export default class Smoke extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.floor(Math.random() * 5) + 3;
	}
}

import Box from "./Box.js";

export default class Gift extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.ceil(Math.random() * -5);
	}
}

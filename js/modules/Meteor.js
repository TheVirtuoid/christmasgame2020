import Box from "./Box.js";

export default class Meteor extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.floor(Math.random() * 10);
	}
}

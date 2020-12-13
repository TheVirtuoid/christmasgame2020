/** NOT CURRENTLY IMPLEMENTED */

import Box from "./../game/Box.js";

export default class Gift extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.ceil(Math.random() * -5);
	}
}

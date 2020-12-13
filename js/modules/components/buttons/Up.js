import Button from "../Button.js";

export default class Up extends Button {
	constructor(args) {
		super(args);
		this.image.height = 30;
		this.image.width = 30;
		this.height = 30;
		this.width = 30;
	}
}

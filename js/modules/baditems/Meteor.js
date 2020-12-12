import Box from "./../game/Box.js";

export default class Meteor extends Box {
	constructor(args) {
		super(args);
		this.color = "crimson";
		this.name = "Meteor";
		this.image.height = 50;
		this.image.width = 61;
		this.height = 50;
		this.width = 61;
	}

	get damage() {
		return Math.floor(Math.random() * 10);
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.draw(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}

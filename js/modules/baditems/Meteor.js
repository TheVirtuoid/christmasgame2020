import Box from "./../game/Box.js";

export default class Meteor extends Box {
	constructor(args) {
		super(args);
		this.color = "crimson";
		this.name = "Meteor";
		this.image = new Image();
		this.image.src = "/img/meteor.png";
		this.image.height = 30;
		this.image.width = 30;
		this.height = 30;
		this.width = 30;
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

import Box from "./../game/Box.js";

export default class Bird extends Box {
	constructor(args) {
		super(args);
		this.color = "firebrick";
		this.name = "Bird";
		this.image = this.screen.playground.assets.bird;
		this.image.height = 30;
		this.image.width = 64;
		this.height = 30;
		this.width = 64;
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

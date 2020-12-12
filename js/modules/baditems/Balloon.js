import Box from "./../game/Box.js";

export default class Balloon extends Box {
	constructor(args) {
		super(args);
		this.color = "LightSalmon";
		this.name = "Balloon";
		this.image.height = 60;
		this.image.width = 34;
		this.height = 60;
		this.width = 34;
	}

	get damage() {
		return Math.floor(Math.random() * 5) + 3;
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

import Box from "./../game/Box.js";

export default class Airplane extends Box {
	constructor(args) {
		super(args);
		this.color = "darkred";
		this.name = "Airplane";
		this.image.height = 50;
		this.image.width = 50;
		this.height = 50;
		this.width = 50;
	}

	get damage() {
		return Math.floor(Math.random() * 20) + 10;
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

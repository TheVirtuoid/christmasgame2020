import Box from "./../game/Box.js";

export default class Ufo extends Box {
	constructor(args) {
		super(args);
		this.color = "LightCoral";
		this.name = "UFO";
		this.image = new Image();
		this.image.src = "/img/ufo.png";
		this.image.height = 19;
		this.image.width = 30;
		this.height = 19;
		this.width = 30;
	}

	get damage() {
		return Math.floor(Math.random() * 10) + 15;
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

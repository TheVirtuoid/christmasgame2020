import Component from "./Component.js";

export default class GameOverText extends Component {
	constructor(args) {
		super(args);
		this.color = "white";
		this.font = "Courier New, monospace";
		this.justify = "center";
	}

	draw() {
		super.draw("GAME OVER", this.top, this.left);
	}

	erase() {
		super.erase(this.top, this.left);
	}
}

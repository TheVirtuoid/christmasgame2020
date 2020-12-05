import Component from "./Component.js";

export default class RunRunSanta extends Component {
	constructor(args) {
		super(args);
		this.color = "white";
		this.font = "Courier New, monospace";
		this.justify = "left";
	}

	draw() {
		super.draw("Run", this.top, this.left);
		super.draw("Run", this.top + 70, this.left + 90);
		super.draw("Santa!", this.top + 140, this.left + 180);
	}

	erase() {
		super.erase(this.top, this.left);
		super.erase(this.top + 70, this.left + 90);
		super.erase(this.top + 140, this.left + 180);
	}
}

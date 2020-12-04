import Component from "./Component.js";

export default class RunRunSanta extends Component {
	constructor(args) {
		super(args);
		this.color = "white";
		this.font = "Courier New, monospace";
		this.x = 10;
		this.y = 200;
	}

	draw(score) {
		this.size = 60;
		this.pos = { x: this.x, y: this.y};
		super.draw("Run");

		this.pos = { x: this.x + 90, y: this.y + 70 };
		super.draw("Run");

		this.pos = { x: this.x + 180, y: this.y + 140 };
		super.draw("Santa!");

	}

}

import Component from "./Component.js";

export default class Text extends Component {
	constructor(args) {
		super(args);
		this.color = "white";
		this.font = "Courier New, monospace";
		this.justify = "center";
		this.text = args.text;
	}

	draw() {
		super.draw(this.text, this.top, this.left);
	}

	erase() {
		super.erase(this.top, this.left);
	}
}

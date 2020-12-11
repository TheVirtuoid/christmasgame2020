import Component from "./Component.js";

export default class Text extends Component {
	constructor(args) {
		super(args);
		const { text = "" } = args;
		this.text = text;
	}

	draw() {
		super.draw(this.text, this.top, this.left);
	}

	erase() {
		super.erase(this.top, this.left);
	}
}

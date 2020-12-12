import Component from "./Component.js";

export default class Button extends Component {
	constructor(args) {
		super(args);
		const { action, text } = args;
		this.text = text;
		this.action = action;

	}

	erase() {
		this.game.events.remove(this.action);
		super.erase();
	}

	draw() {
		if (this.image) {
			super.drawImage(this.top, this.left);
		} else {
			this.action.clickZone = super.draw(this.text);
			this.game.events.add(this.action);
		}
	}
}

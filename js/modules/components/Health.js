import Component from "./Component.js";

export default class Health extends Component {
	constructor(args) {
		super(args);
		this.color = "yellow";
		this.font = "Courier New, monospace";
		this.size = 20;
		this.healthText = {
			text: "HEALTH",
			size: 18,
			y: 10
		}
		this.healthScore = {
			text: "",
			size: 20,
			y: 10 + this.renderer.fontSizes[this.healthText.size].height
		}
	}

	draw(score) {
		const oneThird = this.renderer.width / 3;
		this.text = this.healthText.text;
		this.size = this.healthText.size;
		this.pos = { x: oneThird * 2 + ((oneThird - this.text.length * this.renderer.fontSizes[this.size].width) / 2), y: this.healthText.y }
		super.draw(this.text);

		this.text = "100";
		this.size = this.healthScore.size;
		this.pos = { x: oneThird * 2 + ((oneThird - this.text.length * this.renderer.fontSizes[this.size].width) / 2), y: this.healthScore.y }
		super.draw(this.text);
	}
}

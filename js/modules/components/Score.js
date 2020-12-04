import Component from "./Component.js";

export default class Score extends Component {
	constructor(args) {
		super(args);
		this.color = "yellow";
		this.font = "Courier New, monospace";
		this.size = 20;
		this.scoreText = {
			text: "SCORE",
			size: 18,
			y: 10
		}
		this.scoreScore = {
			text: "",
			size: 20,
			y: 10 + this.renderer.fontSizes[this.scoreText.size].height
		}
	}

	draw(score) {
		this.text = this.scoreText.text;
		this.size = this.scoreText.size;
		this.pos = { x: ( (this.renderer.width / 3) - this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: this.scoreText.y };
		super.draw(this.text);

		this.text = "31019";
		this.size = this.scoreScore.size;
		this.pos = { x: ( (this.renderer.width / 3) - this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: this.scoreScore.y };
		super.draw(this.text);
	}
}

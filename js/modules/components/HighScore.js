import Component from "./Component.js";

export default class HighScore extends Component {
	constructor(args) {
		super(args);
		this.text = "HI SCORE";
		this.color = "yellow";
		this.font = "Courier New, monospace";
		this.size = 20;
		this.hiScoreText = {
			text: "HI SCORE",
			size: 18,
			y: 10
		}
		this.hiScoreScore = {
			text: "",
			size: 20,
			y: 10 + this.renderer.fontSizes[this.hiScoreText.size].height
		}
	}

	draw(score) {
		this.text = this.hiScoreText.text;
		this.size = this.hiScoreText.size;
		this.pos = { x: (this.renderer.width - this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: this.hiScoreText.y };
		super.draw(this.text);

		this.text = "00000 - AAA";
		this.size = this.hiScoreScore.size;
		this.pos = { x: (this.renderer.width - this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: this.hiScoreScore.y };
		super.draw(this.text);
	}
}

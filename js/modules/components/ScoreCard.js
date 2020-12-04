import Component from "./Component.js";
import Score from "./../game/Score.js";

export default class ScoreCard extends Component {
	constructor(args) {
		super(args);
		this.gameScore = new Score(0);
		this.scoreBoardSection = {
			text: {
				x1: 10,
				y1: 10,
				width: Math.floor(this.renderer.width / 3),
				// height: this.renderer.fontSizes(18),
				height: 10,
				size: 18
			},
			score: {
				x1: 10,
				// y1: this.renderer.fontSizes(this.fontSizes.text) + 11,
				y1: 21,
				width: Math.floor(this.renderer.width / 3),
				// height: this.renderer.fontSizes(20),
				height: 10,
				size: 20
			}
		}
		this.color = "yellow";
		this.font = "Courier New, monospace";
	}

	erase() {
		this.eraseText();
		this.eraseScore();
	}

	eraseText() {
		const { x1, y1, width, height } = this.scoreBoardSection.text;
		this.renderer.ctx.fillStyle = "black";
		this.renderer.ctx.fillRect(x1, y1, width, height);
	}

	eraseScore() {
		const { x1, y1, width, height } = this.scoreBoardSection.score;
		this.renderer.ctx.fillStyle = "black";
		this.renderer.ctx.fillRect(x1, y1, width, height);
	}

	draw() {
		this.drawHeaderText();
		this.drawScore();
	}

	drawHeaderText() {
		const { x1, y1, width, height, size } = this.scoreBoardSection.text;
		this.eraseText();
		this.text = "SCORE"
		this.size = size;
		this.pos = { x:  x1 + width - (this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: y1  };
		super.draw(this.text);
	}

	drawScore() {
		const { x1, y1, width, height, size } = this.scoreBoardSection.text;
		this.eraseScore();
		this.text = this.gameScore.score.toString();
		this.size = size;
		this.pos = { x:  x1 + width - (this.text.length * this.renderer.fontSizes[this.size].width) / 2, y: y1  };
		super.draw(this.text);
	}

	addScore(score) {
		this.gameScore.add(score);
	}
}
